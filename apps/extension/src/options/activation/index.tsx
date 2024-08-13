import ApiKeysSetupForm from "./_components/api-keys-setup-form";

export default function Activation() {
  return (
    <div>
      <div>
        <h1 className="font-semibold text-2xl">Activation</h1>
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <div className="space-y-4">
          <ApiKeysSetupForm />
        </div>
      </div>
    </div>
  );
}
