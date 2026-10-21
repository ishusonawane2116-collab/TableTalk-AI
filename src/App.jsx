import './App.css'

const dishes = [
  {
    name: 'Paneer Tikka',
    description: 'A classic Indian favourite with aromatic spices.',
    image:
      'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Signature Biryani',
    description: 'Fragrant rice inspired by Indian culinary traditions.',
    image:
      'https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Indian Thali',
    description: 'A colourful spread of Indian-inspired flavours.',
    image:
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
  },
]

function App() {
  return (
    <main className="app">
      <nav className="navbar">
        <a className="brand" href="#home">
          TableTalk <span>AI</span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#reservations">Reservations</a>
          <a href="#assistant">AI Assistant</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=85"
            alt="Elegant restaurant dining room"
          />
        </div>

        <div className="hero-overlay">
          <p className="eyebrow">SAFFRON & SAGE · BANDRA WEST, MUMBAI</p>

          <h1>
            Exceptional Dining,
            <br />
            <span>Effortless Reservations.</span>
          </h1>

          <p className="subtitle">
            Discover delightful dining at Saffron & Sage.
            Reserve your table with our intelligent AI booking assistant.
          </p>

          <div className="hero-actions" id="reservations">
            <a className="primary-button" href="#assistant">
              Book a Table
            </a>
            <a className="secondary-button" href="#assistant">
              Chat with AI
            </a>
          </div>

          <p className="hero-quote">
            Your Table. Your Time. Your Conversation.
          </p>
        </div>
      </section>

      <section className="welcome section" id="about">
        <p className="eyebrow">WELCOME</p>
        <h2>A warm room, a bold kitchen, a gracious welcome.</h2>

        <p className="section-description">
          Saffron & Sage is presented as a modern Indian dining
          experience where spice traditions meet seasonal produce.
        </p>

        <div className="features">
          <article>
            <span>01</span>
            <h3>Chef-led</h3>
            <p>Thoughtfully prepared dining experiences.</p>
          </article>

          <article>
            <span>02</span>
            <h3>Seasonal menu</h3>
            <p>A menu inspired by ingredients and tradition.</p>
          </article>

          <article>
            <span>03</span>
            <h3>Instant booking</h3>
            <p>A convenient path to planning your visit.</p>
          </article>
        </div>
      </section>

      <section className="menu-section section" id="menu">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FROM OUR KITCHEN</p>
            <h2>Featured dishes</h2>
          </div>

          <span className="menu-label">Food inspiration</span>
        </div>

        <div className="dish-grid">
          {dishes.map((dish) => (
            <article className="dish-card" key={dish.name}>
              <img
                src={dish.image}
                alt={dish.name}
                loading="lazy"
              />

              <div className="dish-content">
                <h3>{dish.name}</h3>
                <p>{dish.description}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="image-note">
          Illustrative food photography. These are not verified
          photographs of Saffron & Sage's actual menu items.
        </p>
      </section>

      <section className="assistant-section section" id="assistant">
        <div className="assistant-card">
          <p className="eyebrow">TABLETALK AI</p>

          <h2>Just ask. By text or by voice.</h2>

          <p>
            Plan your dining experience with a conversational
            assistant. A real booking system must be connected
            before reservations can be confirmed.
          </p>

          <div className="assistant-example">
            “Book a table for four people tomorrow at seven PM.”
          </div>

          <a className="primary-button" href="#contact">
            Get in touch
          </a>
        </div>
      </section>

      <section className="visit-section section" id="contact">
        <div>
          <p className="eyebrow">PLAN YOUR VISIT</p>
          <h2>We look forward to welcoming you.</h2>
          <p>
            Saffron & Sage · Bandra West, Mumbai
          </p>
          <a
            className="text-link"
            href="https://www.google.com/maps/search/?api=1&query=Saffron+%26+Sage+Bandra+West+Mumbai"
            target="_blank"
            rel="noreferrer"
          >
            Search location on Google Maps ↗
          </a>
        </div>

        <div className="hours-card">
          <h3>Opening hours</h3>
          <p>Please confirm current hours with the restaurant.</p>
          <h3>Reservations & enquiries</h3>
          <p>Booking confirmation is not available in this demo.</p>
        </div>
      </section>

      <footer className="footer">
        <a className="brand" href="#home">
          TableTalk <span>AI</span>
        </a>

        <p>Your Table. Your Time. Your Conversation.</p>
        <p>© 2026 TableTalk AI</p>
      </footer>
    </main>
  )
}

export default App
