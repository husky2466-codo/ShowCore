// Bookings & Messaging Types

// ============================================================================
// Core Entities
// ============================================================================

export type BookingType = 'direct' | 'open';

export type BookingStatus =
  | 'pending'      // Waiting for response or applications
  | 'confirmed'    // Accepted and contract signed
  | 'in-progress'  // Work is currently happening
  | 'completed'    // Work finished, payment processed
  | 'cancelled';   // Booking cancelled by either party

export type ApplicationStatus =
  | 'pending'      // Waiting for client review
  | 'accepted'     // Client accepted this application
  | 'declined';    // Client declined this application

export type OfferType =
  | 'initial'      // First offer
  | 'counter';     // Counter-offer in negotiation

export type OfferStatus =
  | 'pending'      // Waiting for response
  | 'accepted'     // Offer accepted
  | 'declined'     // Offer declined
  | 'countered';   // Recipient sent counter-offer

export type ContractStatus =
  | 'draft'        // Being created
  | 'pending'      // Sent, waiting for signatures
  | 'signed';      // Both parties signed

export type DepositStatus =
  | 'pending'      // Payment not yet received
  | 'paid'         // Payment received
  | 'refunded';    // Payment refunded

export type TimeEntryStatus =
  | 'pending'      // Awaiting client approval
  | 'approved'     // Client approved
  | 'disputed';    // Client disputed

export type InvoiceStatus =
  | 'draft'        // Not yet sent
  | 'sent'         // Sent to client
  | 'viewed'       // Client viewed invoice
  | 'paid'         // Payment received
  | 'overdue';     // Past due date

export type PaymentMethod =
  | 'credit_card'
  | 'bank_transfer'
  | 'check'
  | 'paypal';

/**
 * User in the booking system
 * Can be either a client (company) or a technician
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'client' | 'technician';
}

/**
 * Booking entity
 * Represents a job engagement between a client and technician
 */
export interface Booking {
  id: string;
  bookingType: BookingType;
  clientId: string;
  technicianId: string | null; // null for open bookings without accepted applicant
  serviceType: string;
  title: string;
  description: string;
  location: string;
  startDate: string; // ISO 8601
  endDate: string; // ISO 8601
  estimatedDuration: number; // hours

  // Pricing (varies by booking type)
  agreedRate?: number; // For confirmed bookings
  totalEstimate?: number; // For confirmed bookings
  budgetMin?: number; // For open bookings
  budgetMax?: number; // For open bookings

  status: BookingStatus;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601

  // Deposit & contract
  requiresDeposit: boolean;
  cancellationPolicy: string;

  // Open booking specific
  applicationDeadline?: string; // ISO 8601
  maxApplicants?: number;
  visibility?: 'public' | 'invite-only';

  // Recurring bookings
  isRecurring?: boolean;
  recurrencePattern?: 'weekly' | 'biweekly' | 'monthly';

  // Cancellation details
  cancelledBy?: 'client' | 'technician';
  cancelledAt?: string; // ISO 8601
  cancellationReason?: string;
  refundAmount?: number;
}

/**
 * Application from technician to an open booking
 */
export interface BookingApplication {
  id: string;
  bookingId: string;
  technicianId: string;
  proposedRate: number;
  coverMessage: string;
  availability: string;
  status: ApplicationStatus;
  appliedAt: string; // ISO 8601
}

/**
 * Offer or counter-offer during booking negotiation
 */
export interface Offer {
  id: string;
  bookingId: string;
  fromUserId: string;
  toUserId: string;
  offerType: OfferType;
  proposedRate: number;
  proposedStartDate: string; // ISO 8601
  proposedEndDate: string; // ISO 8601
  proposedDuration: number; // hours
  message: string;
  status: OfferStatus;
  createdAt: string; // ISO 8601
  respondedAt?: string; // ISO 8601
}

/**
 * Service contract between technician and client
 */
export interface Contract {
  id: string;
  bookingId: string;
  title: string;
  scope: string;
  terms: string;
  deliverables: string;
  cancellationPolicy: string;
  technicianSignature: Signature | null;
  clientSignature: Signature | null;
  status: ContractStatus;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export interface Signature {
  signed: boolean;
  signedAt?: string; // ISO 8601
  signedBy?: string; // User ID
  ipAddress?: string;
}

/**
 * Deposit payment to confirm booking
 */
export interface Deposit {
  id: string;
  bookingId: string;
  amount: number;
  percentage: number;
  status: DepositStatus;
  dueDate: string; // ISO 8601
  paidAt?: string; // ISO 8601
  refundedAt?: string; // ISO 8601
  paymentMethod?: PaymentMethod;
  transactionId?: string;
  refundTransactionId?: string;
  refundable: boolean;
  refundPolicy: string;
}

/**
 * Time tracking entry logged by technician
 */
export interface TimeEntry {
  id: string;
  bookingId: string;
  technicianId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // ISO 8601
  endTime: string; // ISO 8601
  duration: number; // hours (decimal)
  notes: string;
  billable: boolean;
  status: TimeEntryStatus;
  createdAt: string; // ISO 8601
  approvedAt?: string; // ISO 8601
  approvedBy?: string; // User ID
  disputedAt?: string; // ISO 8601
  disputeReason?: string;
}

/**
 * Invoice for completed work
 */
export interface Invoice {
  id: string;
  bookingId: string;
  invoiceNumber: string;
  technicianId: string;
  clientId: string;
  issueDate: string; // YYYY-MM-DD
  dueDate: string; // YYYY-MM-DD
  lineItems: InvoiceLineItem[];
  subtotal: number;
  depositDeduction: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  status: InvoiceStatus;
  notes: string;
  paidAt?: string; // ISO 8601
  paymentMethod?: PaymentMethod;
  transactionId?: string;
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  notes?: string;
}

/**
 * Message in a booking-specific thread
 */
export interface Message {
  id: string;
  bookingId: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string; // ISO 8601
  read: boolean;
  readAt?: string; // ISO 8601
  attachments: MessageAttachment[];
}

export interface MessageAttachment {
  id: string;
  filename: string;
  fileSize: number; // bytes
  mimeType: string;
  url: string;
}

// ============================================================================
// View & Component Props
// ============================================================================

/**
 * Props for Bookings & Messaging views
 * All user actions are handled via callback props
 */
export interface BookingsMessagingProps {
  // Current user context
  currentUserId: string;
  currentUserRole: 'client' | 'technician';

  // Data
  bookings: Booking[];
  users: User[];
  applications: BookingApplication[];
  offers: Offer[];
  contracts: Contract[];
  deposits: Deposit[];
  timeEntries: TimeEntry[];
  invoices: Invoice[];
  messages: Message[];

  // Navigation & View State
  selectedBookingId?: string;
  view?: 'list' | 'calendar';
  statusFilter?: BookingStatus | 'all';

  // Booking Actions
  onCreateDirectBooking: (booking: Partial<Booking>) => void;
  onCreateOpenBooking: (booking: Partial<Booking>) => void;
  onApplyToBooking: (bookingId: string, application: Partial<BookingApplication>) => void;
  onAcceptApplication: (applicationId: string) => void;
  onDeclineApplication: (applicationId: string) => void;
  onCancelBooking: (bookingId: string, reason: string) => void;

  // Offer & Negotiation Actions
  onAcceptOffer: (offerId: string) => void;
  onDeclineOffer: (offerId: string) => void;
  onCounterOffer: (offerId: string, counterOffer: Partial<Offer>) => void;

  // Contract Actions
  onGenerateContract: (bookingId: string, contract: Partial<Contract>) => void;
  onSignContract: (contractId: string) => void;
  onDownloadContract: (contractId: string) => void;

  // Deposit Actions
  onSubmitDeposit: (depositId: string, paymentMethod: PaymentMethod) => void;

  // Time Tracking Actions
  onStartTimer: (bookingId: string) => void;
  onStopTimer: (timeEntryId: string) => void;
  onCreateTimeEntry: (timeEntry: Partial<TimeEntry>) => void;
  onUpdateTimeEntry: (timeEntryId: string, updates: Partial<TimeEntry>) => void;
  onDeleteTimeEntry: (timeEntryId: string) => void;
  onApproveTimeEntry: (timeEntryId: string) => void;
  onDisputeTimeEntry: (timeEntryId: string, reason: string) => void;

  // Invoice Actions
  onGenerateInvoice: (bookingId: string) => void;
  onSendInvoice: (invoiceId: string) => void;
  onPayInvoice: (invoiceId: string, paymentMethod: PaymentMethod) => void;
  onDownloadInvoice: (invoiceId: string) => void;
  onDisputeInvoice: (invoiceId: string, reason: string) => void;

  // Messaging Actions
  onSendMessage: (bookingId: string, message: Partial<Message>) => void;
  onMarkMessageRead: (messageId: string) => void;
  onUploadAttachment: (file: File) => Promise<MessageAttachment>;

  // UI Actions
  onSelectBooking: (bookingId: string) => void;
  onChangeView: (view: 'list' | 'calendar') => void;
  onFilterByStatus: (status: BookingStatus | 'all') => void;
  onSearchBookings: (query: string) => void;
}

// ============================================================================
// Helper Types
// ============================================================================

/**
 * Booking with related data populated
 */
export interface BookingWithRelations extends Booking {
  client?: User;
  technician?: User;
  applications?: BookingApplication[];
  offers?: Offer[];
  contract?: Contract;
  deposit?: Deposit;
  timeEntries?: TimeEntry[];
  invoices?: Invoice[];
  messages?: Message[];
  unreadMessageCount?: number;
}

/**
 * Statistics for bookings overview
 */
export interface BookingStats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  inProgressBookings: number;
  completedBookings: number;
  totalRevenue: number;
  pendingPayments: number;
  overdueInvoices: number;
}

/**
 * Calendar event for bookings calendar view
 */
export interface CalendarEvent {
  id: string;
  bookingId: string;
  title: string;
  startDate: Date;
  endDate: Date;
  status: BookingStatus;
  color: string;
  client?: User;
  technician?: User;
}

/**
 * Filter options for bookings list
 */
export interface BookingFilters {
  status?: BookingStatus | 'all';
  serviceType?: string;
  dateRange?: {
    start: string; // ISO 8601
    end: string; // ISO 8601
  };
  searchQuery?: string;
}
