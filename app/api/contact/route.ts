import { handleContactRequest } from "@/lib/contact"

export const runtime = "nodejs"

const ALLOWED_METHODS = "OPTIONS, POST"

function methodNotAllowed() {
  return new Response(JSON.stringify({ ok: false, errorCode: "METHOD_NOT_ALLOWED" }), {
    status: 405,
    headers: {
      Allow: ALLOWED_METHODS,
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
    },
  })
}

export async function POST(request: Request) {
  return handleContactRequest(request)
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: ALLOWED_METHODS,
      "Cache-Control": "no-store",
    },
  })
}

export async function GET() {
  return methodNotAllowed()
}

export async function PUT() {
  return methodNotAllowed()
}

export async function PATCH() {
  return methodNotAllowed()
}

export async function DELETE() {
  return methodNotAllowed()
}

export async function HEAD() {
  return methodNotAllowed()
}
