import { useSyncExternalStore } from 'react'

export interface NotificationMessage {
  id: string
  author: 'Sistema' | 'Tu'
  text: string
  time: string
}

export interface AppNotification {
  id: string
  title: string
  preview: string
  time: string
  unread: boolean
  messages: NotificationMessage[]
}

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'N-001',
    title: 'Nuova richiesta ricevuta',
    preview: 'Sposta Data',
    time: 'Oggi, 09:15',
    unread: true,
    messages: [
      { id: 'N-001-M1', author: 'Sistema', text: 'Nuova richiesta ricevuta: Sposta Data.', time: '09:15' },
      { id: 'N-001-M2', author: 'Sistema', text: 'Controlla i dettagli e conferma la presa in carico.', time: '09:16' },
    ],
  },
  {
    id: 'N-002',
    title: 'Richiesta aggiornata',
    preview: 'KFT-002 è stata aggiornata',
    time: 'Ieri, 17:42',
    unread: true,
    messages: [
      { id: 'N-002-M1', author: 'Sistema', text: 'La richiesta KFT-002 è stata aggiornata.', time: '17:42' },
      { id: 'N-002-M2', author: 'Sistema', text: 'Nuovo stato: In lavorazione.', time: '17:43' },
    ],
  },
  {
    id: 'N-003',
    title: 'Richiesta chiusa',
    preview: 'KFT-005 è stata chiusa',
    time: 'Ieri, 11:08',
    unread: false,
    messages: [
      { id: 'N-003-M1', author: 'Sistema', text: 'La richiesta KFT-005 è stata chiusa.', time: '11:08' },
    ],
  },
]

function cloneInitialNotifications() {
  return INITIAL_NOTIFICATIONS.map((notification) => ({
    ...notification,
    messages: notification.messages.map((message) => ({ ...message })),
  }))
}

let notificationsState: AppNotification[] = cloneInitialNotifications()

const listeners = new Set<() => void>()

function emitNotificationsChange() {
  listeners.forEach((listener) => listener())
}

function subscribeNotifications(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getNotificationsSnapshot() {
  return notificationsState
}

export function useNotifications() {
  const notifications = useSyncExternalStore(
    subscribeNotifications,
    getNotificationsSnapshot,
    getNotificationsSnapshot
  )

  const unreadCount = notifications.filter((notification) => notification.unread).length

  return { notifications, unreadCount }
}

export function markNotificationAsRead(notificationId: string) {
  let changed = false
  notificationsState = notificationsState.map((notification) => {
    if (notification.id !== notificationId || !notification.unread) return notification
    changed = true
    return { ...notification, unread: false }
  })
  if (changed) emitNotificationsChange()
}

export function appendNotificationReply(notificationId: string, text: string) {
  const trimmedText = text.trim()
  if (!trimmedText) return

  notificationsState = notificationsState.map((notification) => {
    if (notification.id !== notificationId) return notification

    const nextMessage: NotificationMessage = {
      id: `${notification.id}-R-${Date.now()}`,
      author: 'Tu',
      text: trimmedText,
      time: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
    }

    return {
      ...notification,
      unread: false,
      time: 'Adesso',
      messages: [...notification.messages, nextMessage],
    }
  })

  emitNotificationsChange()
}

export function resetNotificationsForDemo() {
  notificationsState = cloneInitialNotifications().map((notification, index) => ({
    ...notification,
    unread: index === 0,
  }))
  emitNotificationsChange()
}
