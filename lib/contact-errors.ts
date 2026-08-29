export const contactErrorMessages: Record<string, string> = {
  INVALID_JSON: "The form could not be read. Please refresh the page and try again.",
  VALIDATION_ERROR: "Check the highlighted information and try again.",
  ORIGIN_REJECTED: "This form could not verify the page it was sent from. Please refresh and try again.",
  PAYLOAD_TOO_LARGE: "The message is too long. Shorten it or email us directly.",
  UNSUPPORTED_MEDIA_TYPE: "The form could not be submitted from this browser. Please email us directly.",
  SUBMISSION_TOO_FAST: "Please wait a moment, then submit the form again.",
  FORM_SESSION_EXPIRED: "This form session expired. Please refresh the page and try again.",
  RATE_LIMITED: "Too many attempts were received. Please wait a few minutes or email us directly.",
  DELIVERY_UNAVAILABLE: "The message could not be delivered right now. Please email us directly.",
  INTERNAL_ERROR: "Something went wrong. Please email us directly.",
}

export function getContactErrorMessage(errorCode?: string) {
  return errorCode && contactErrorMessages[errorCode]
    ? contactErrorMessages[errorCode]
    : contactErrorMessages.INTERNAL_ERROR
}
