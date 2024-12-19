export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Select your home airport",
      description: "Choose your home airport or any airport of your choice. Best deals from the other airports will also be recommended"
    },
    {
      number: "02",
      title: "Watch the deals roll in",
      description: "From north to south and east to west select the flight deal which works best for you"
    },
    {
      number: "03",
      title: "Book it",
      description: "Click on the booking link and visit your dream destination"
    }
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="p-6 bg-[#FFE978]/10 rounded-lg"
            >
              <div className="text-xl font-semibold mb-4">{step.number}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-secondary">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}