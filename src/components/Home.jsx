const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-indigo-600">DevTinder</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Find your perfect developer match! Connect with talented developers, 
            share your skills, and build amazing projects together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary btn-lg">
              Start Matching
            </button>
            <button className="btn btn-outline btn-lg">
              Learn More
            </button>
          </div>
          
          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="card bg-white shadow-lg">
              <div className="card-body text-center">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="card-title justify-center">Smart Matching</h3>
                <p className="text-gray-600">AI-powered algorithm matches you with compatible developers</p>
              </div>
            </div>
            <div className="card bg-white shadow-lg">
              <div className="card-body text-center">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="card-title justify-center">Easy Communication</h3>
                <p className="text-gray-600">Built-in chat and collaboration tools</p>
              </div>
            </div>
            <div className="card bg-white shadow-lg">
              <div className="card-body text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="card-title justify-center">Project Ready</h3>
                <p className="text-gray-600">Start building amazing projects together</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;