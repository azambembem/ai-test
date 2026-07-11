export interface ContactPayload {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  jobTitle: string
  department: string
  subject: string
  budget: string
  preferredContact: string
  heardFrom: string
  message: string
  newsletter: boolean
}

export interface ContactResponse {
  ticketId: string
  status: 'received'
  estimatedResponseTime: string
}

export type ContactStage =
  | 'validating'
  | 'authenticating'
  | 'uploading'
  | 'processing'
  | 'done'

export const CONTACT_STAGES: { key: ContactStage; label: string }[] = [
  { key: 'validating', label: 'Validating your details' },
  { key: 'authenticating', label: 'Authenticating request' },
  { key: 'uploading', label: 'Uploading to server' },
  { key: 'processing', label: 'Processing your message' },
  { key: 'done', label: 'Confirmed' },
]

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function randomTicketId() {
  return `TCK-${Math.floor(100000 + Math.random() * 900000)}`
}

// Simulates a real backend round-trip: a handful of staged delays with an
// occasional server-side failure, so the UI has something honest to react to.
export async function submitContactForm(
  payload: ContactPayload,
  onStageChange?: (stage: ContactStage) => void,
): Promise<ContactResponse> {
  onStageChange?.('validating')
  await delay(350 + Math.random() * 250)

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    throw new Error('The server rejected this email address')
  }

  onStageChange?.('authenticating')
  await delay(300 + Math.random() * 250)

  onStageChange?.('uploading')
  await delay(400 + Math.random() * 350)

  onStageChange?.('processing')
  await delay(350 + Math.random() * 300)

  if (Math.random() < 0.08) {
    throw new Error('The server timed out. Please try again.')
  }

  onStageChange?.('done')
  await delay(250)

  return {
    ticketId: randomTicketId(),
    status: 'received',
    estimatedResponseTime: '1-2 business days',
  }
}
