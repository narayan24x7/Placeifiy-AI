// Code by Nk
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Side */}
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="/bg2.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            {/* ✅ fixed logo */}
            <a className="block text-white" href="#">
              <img src="/logo4.png" width={200} height={200} alt="Placifiy-AI Logo" />
            </a>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl text-left">
              Welcome to Placeifiy-AI
            </h2>

            <p className="mt-4 leading-relaxed text-white/90 text-left">
              "Elevate your career with intelligent mock interviews and
              personalized resume building. Transform your job search and stand
              out to employers with our advanced AI technology."
            </p>
          </div>
        </section>

        {/* Right Side */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 bg-black">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                href="#"
              >
                <span className="sr-only">Home</span>
                {/* ✅ fixed mobile logo */}
                <img
                  src="/logo4.png"
                  alt="Placifiy-AI Logo"
                  width={50}
                  height={50}
                />
              </a>

              <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl md:text-4xl text-left">
                Welcome to Placeifiy-AI
              </h1>

              {/* ✅ text aligned left instead of justify */}
              <p className="mt-4 leading-relaxed text-gray-500 mb-10 text-left">
                "Elevate your career with intelligent mock interviews and
                personalized resume building. Transform your job search and
                stand out to employers with our advanced AI technology."
              </p>
            </div>

            <SignUp
              appearance={{
                elements: {
                  formButtonPrimary: {
                    backgroundColor: "#22c55e",
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    border: "none",
                    ":hover": {
                      backgroundColor: "#16a34a",
                    },
                  },
                },
              }}
            />
          </div>
        </main>
      </div>
    </section>
  );
}
