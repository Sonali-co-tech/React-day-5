import { Suspense, use } from 'react'
import './App.css'

const usersPromise = fetch('https://jsonplaceholder.typicode.com/users').then(
  async (response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch users. Please try again.')
    }

    return response.json()
  },
)

function toTitleCase(text) {
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function getMobile(phone) {
  const match = phone.match(/\d[\d\-().\s]{7,}\d/)
  return match ? `+${match[0].replace(/[^\d]/g, '')}` : phone
}

function UserCards() {
  const users = use(usersPromise)

  return (
    <div className="gallery" role="list" aria-label="User card gallery">
      {users.map((user) => {
        const initials = user.name
          .split(' ')
          .slice(0, 2)
          .map((part) => part[0])
          .join('')
          .toUpperCase()

        const officePhone = getMobile(user.phone)
        const mobile = officePhone
        const jobTitle = toTitleCase(user.company.bs.split(' ').slice(0, 2).join(' '))

        return (
          <article key={user.id} className="user-card" role="listitem">
            <div className="avatar-wrap" aria-hidden="true">
              <div className="avatar">{initials}</div>
            </div>

            <div className="user-info">
              <h2 style={{ fontSize: '1.2rem', margin: '0 0 0.65rem 0' }}><span className="label">Name:</span> {user.name}</h2>
              
              <p>
                <span className="label">Job Title:</span> {jobTitle}
              </p>
              <p>
                <span className="label">Department:</span> {user.company.name}
              </p>
              <p>
                <span className="label">Office Phone:</span> {officePhone}
              </p>
              <p>
                <span className="label">Mobile:</span> {mobile}
              </p>
              <p>
                <span className="label">Email:</span>{' '}
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </p>
            </div>
          </article>
        )
      })}
    </div>
  )
}

function App() {
  return (
    <main className="app-container">
      <header>
        <h1>User Card Gallery</h1>
        <p>Professional employee profile cards</p>
      </header>

      <Suspense fallback={<p className="status">Loading user cards...</p>}>
        <UserCards />
      </Suspense>
    </main>
  )
}

export default App
