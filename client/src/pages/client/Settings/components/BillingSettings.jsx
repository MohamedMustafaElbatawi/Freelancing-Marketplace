import {
  CreditCard,
  WalletCards,
  ReceiptText,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

export default function BillingSettings() {
  return (
    <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Billing & Payments</h2>

        <p className="mt-1 text-sm text-gray-500">
          Manage your payment methods, transactions, and billing information.
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Coming Soon Card */}
        <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-blue-100/60" />
          <div className="absolute -right-5 -bottom-16 w-40 h-40 rounded-full bg-blue-100/40" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-white text-blue-600 flex items-center justify-center shadow-sm shrink-0">
              <CreditCard size={27} />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-gray-900">
                  Payments are coming soon
                </h3>

                <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wide">
                  Coming Soon
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-2 max-w-2xl">
                We're working on a secure payment system that will allow you to
                manage payments, invoices, and transactions directly from
                EliteLancer.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Features */}
        <div>
          <h3 className="text-base font-bold text-gray-900 mb-4">
            What will be available?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Payment Methods */}
            <div className="p-5 rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50/30 transition">
              <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center mb-4">
                <WalletCards size={20} />
              </div>

              <h4 className="text-sm font-bold text-gray-900">
                Payment Methods
              </h4>

              <p className="text-sm text-gray-500 mt-1">
                Add and manage your preferred payment methods.
              </p>
            </div>

            {/* Transactions */}
            <div className="p-5 rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50/30 transition">
              <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center mb-4">
                <ReceiptText size={20} />
              </div>

              <h4 className="text-sm font-bold text-gray-900">Transactions</h4>

              <p className="text-sm text-gray-500 mt-1">
                View your complete payment and transaction history.
              </p>
            </div>

            {/* Secure Payments */}
            <div className="p-5 rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50/30 transition">
              <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center mb-4">
                <ShieldCheck size={20} />
              </div>

              <h4 className="text-sm font-bold text-gray-900">
                Secure Payments
              </h4>

              <p className="text-sm text-gray-500 mt-1">
                Your payment information will be protected with secure payment
                processing.
              </p>
            </div>
          </div>
        </div>

        {/* Future Payment Provider */}
        <div className="p-5 rounded-xl border border-dashed border-gray-300 bg-gray-50">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
              <CreditCard size={19} className="text-gray-500" />
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-bold text-gray-900">
                Payment Integration
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Payment processing will be integrated once the marketplace
                payment system is ready.
              </p>

              <button
                type="button"
                disabled
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 text-gray-400 text-sm font-semibold cursor-not-allowed"
              >
                Manage Payments
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
