import { useState, useEffect } from 'react'
import axios from 'axios'
import './AboutUs.css'
import loadingIcon from './loading.gif'

const AboutUs = props => {
  const [aboutData, setAboutData] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about`)
      .then(response => {
        setAboutData(response.data)
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2)
        setError(errMsg)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [])

  return (
    <>
      <h1>About Us</h1>

      {error && <p className="AboutUs-error">{error}</p>}
      {!loaded && <img src={loadingIcon} alt="loading" />}

      {aboutData && (
        <section className="AboutUs-content">
          <img
            src={aboutData.imageUrl}
            alt={aboutData.name}
            className="AboutUs-photo"
          />
          {aboutData.paragraphs.map((paragraph, index) => (
            <p key={index} className="AboutUs-paragraph">
              {paragraph}
            </p>
          ))}
        </section>
      )}
    </>
  )
}

export default AboutUs
