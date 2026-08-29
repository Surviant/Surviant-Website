import { ImageResponse } from "next/og"

import { getOffering, getPractice } from "@/lib/content/services"

export const dynamic = "force-dynamic"

const size = {
  width: 1200,
  height: 630,
}

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams
  const practiceSlug = searchParams.get("practice") || ""
  const offeringSlug = searchParams.get("offering") || ""
  const practice = getPractice(practiceSlug)
  const offering = offeringSlug ? getOffering(practiceSlug, offeringSlug) : undefined

  if (!practice || (offeringSlug && !offering)) {
    return new Response("Not found", { status: 404 })
  }

  const title = offering?.title || practice.title
  const statement = offering?.headline || practice.summary

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F2F6FC",
          color: "#0A1533",
          padding: "54px 62px 48px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 58,
                height: 58,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #155EEF",
                borderRadius: 4,
                background: "#FFFFFF",
                color: "#155EEF",
                fontSize: 38,
                fontWeight: 700,
              }}
            >
              S
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 25, fontWeight: 700 }}>Surviant</div>
              <div style={{ display: "flex", marginTop: 5, color: "#526078", fontSize: 13, letterSpacing: 3 }}>
                SOFTWARE / AI / SYSTEMS
              </div>
            </div>
          </div>
          <div style={{ display: "flex", color: "#155EEF", fontSize: 15, fontWeight: 700, letterSpacing: 2.4 }}>
            SERVICE BRIEF
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 54 }}>
          <div style={{ width: 760, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", color: "#155EEF", fontSize: 17, fontWeight: 700, letterSpacing: 2.2, textTransform: "uppercase" }}>
              {practice.title}
            </div>
            <div style={{ display: "flex", marginTop: 18, fontSize: 62, lineHeight: 1.02, fontWeight: 700, letterSpacing: -2.6 }}>
              {title}
            </div>
            <div style={{ display: "flex", marginTop: 22, maxWidth: 740, color: "#526078", fontSize: 26, lineHeight: 1.34 }}>
              {statement}
            </div>
          </div>

          <div style={{ width: 254, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              ["Digital transformation", "Operation"],
              ["Product engineering", "Software"],
              ["AI engineering", "Intelligence"],
            ].map(([label, output], index) => {
              const selected = label.toLowerCase() === practice.title.toLowerCase()
              return (
                <div
                  key={label}
                  style={{
                    minHeight: 78,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    border: `2px solid ${selected ? "#155EEF" : "#DCE9FF"}`,
                    borderRadius: 4,
                    background: selected ? "#DCE9FF" : "#FFFFFF",
                    padding: "14px 18px",
                  }}
                >
                  <div style={{ display: "flex", color: selected ? "#155EEF" : "#526078", fontSize: 12, fontWeight: 700, letterSpacing: 1.5 }}>
                    LAYER {index + 1}
                  </div>
                  <div style={{ display: "flex", marginTop: 6, fontSize: 18, fontWeight: 700 }}>{output}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "2px solid #DCE9FF", paddingTop: 19 }}>
          <div style={{ display: "flex", color: "#526078", fontSize: 16 }}>One accountable team across the whole system.</div>
          <div style={{ display: "flex", color: "#155EEF", fontSize: 17, fontWeight: 700 }}>surviant.com</div>
        </div>
      </div>
    ),
    size,
  )
}
