import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeCheck, FileCheck2, HandCoins } from "lucide-react"
import { LoanApplyDialog } from "@/components/loan-apply-dialog"
import { FinancingBanksMarquee } from "@/components/financing-banks-marquee"
import { LoanSpecialistCard } from "@/components/loan-specialist-card"

export default function LoanPage() {
  return (
    <main className="min-h-svh">
      <FinancingBanksMarquee />
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 items-start rounded-2xl border bg-card p-6 md:p-8">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Vehicle Financing</p>
            <h1 className="text-pretty text-3xl md:text-5xl/tight font-semibold">
              Finance your next vehicle with confidence
            </h1>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Join thousands of drivers choosing flexible EMIs and fast approvals from trusted lenders. Transparent
              terms. No surprises.
            </p>
            <div className="mt-6">
              {/* Reuse the dialog trigger for a premium CTA */}
              <LoanApplyDialog />
            </div>

            {/* small benefits row */}
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <li className="rounded-lg border bg-background p-3">0 hidden charges</li>
              <li className="rounded-lg border bg-background p-3">Fast approvals</li>
              <li className="rounded-lg border bg-background p-3">Personalized offers</li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck2 className="size-5 text-primary" />
                  Hassle‑Free Paperwork
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Easy paperwork and faster approvals—get your loan and vehicle without the wait.
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BadgeCheck className="size-5 text-primary" />
                  Flexible Financing Options
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Choose plans for cars, tractors, and commercial vehicles with terms that fit your needs.
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HandCoins className="size-5 text-primary" />
                  Lowest EMI
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Pay less each month with competitive EMI offers on new or used vehicle loans.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Loan Specialist Section */}
      <LoanSpecialistCard />
    </main>
  )
}
