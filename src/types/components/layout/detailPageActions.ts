export interface DetailPageActionsProps {
  /** Page title */
  title?: string
  /** Breadcrumb navigation items */
  breadcrumbs?: Array<{
    /** Label text for the breadcrumb */
    label: string
    /** Optional href for clickable breadcrumbs */
    href?: string
  }>
  /** Section navigation items */
  sections?: Array<{
    /** Section title */
    title: string
    /** Unique identifier for the section */
    id?: string
  }>
  /** Save handler function */
  onSave?: () => Promise<void>
  /** Save button visibility */
  isHaveSaveButton?: boolean
}
