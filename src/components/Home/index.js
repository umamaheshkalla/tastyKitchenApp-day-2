import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import CarouselImagesBlog from '../CarouselImagesBlog'

import AllRestaurants from '../AllRestaurants'

import './index.css'

class Home extends Component {
  state = {carouselImages: []}

  componentDidMount() {
    this.getCarouselImages()
  }

  getCarouselImages = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = data.offers.map(eachImage => ({
      id: eachImage.id,
      imageUrl: eachImage.image_url,
    }))
    this.setState({carouselImages: updatedData})
  }

  render() {
    const {carouselImages, activeOptionId} = this.state
    return (
      <div>
        <Header />
        <div className="home-container">
          <CarouselImagesBlog images={carouselImages} />
          <AllRestaurants activeOptionId={activeOptionId} />
        </div>
      </div>
    )
  }
}

export default Home
