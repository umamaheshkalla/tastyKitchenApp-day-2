import {Component} from 'react'

import Cookies from 'js-cookie'
import RestaurantItem from '../RestaurantItem'
import RestaurantsHeader from '../RestaurantsHeader'

import './index.css'

const sortbyOptions = [
  {
    optionId: 'Highest',
    displayText: '',
  },
  {
    optionId: 'Highest',
    displayText: 'Highest',
  },
  {
    optionId: 'Lowest',
    displayText: 'Lowest',
  },
]

class AllRestaurants extends Component {
  state = {restaurantsData: [], activeOptionId: sortbyOptions[0].optionId}

  componentDidMount() {
    this.getAllRestaurants()
  }

  getAllRestaurants = async () => {
    const {activeOptionId} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const LIMIT = 9
    const url = `https://apis.ccbp.in/restaurants-list?limit=${LIMIT}&sort_by_rating=${activeOptionId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = data.restaurants.map(eachItem => ({
      costForTwo: eachItem.cost_for_two,
      cuisine: eachItem.cuisine,
      groupByTime: eachItem.group_by_time,
      hasOnlineDelivery: eachItem.has_online_delivery,
      id: eachItem.id,
      imageUrl: eachItem.image_url,
      isDeliveringNow: eachItem.is_delivering_now,
      location: eachItem.location,
      menuType: eachItem.menu_type,
      name: eachItem.name,
      opensAt: eachItem.opens_at,
      rating: eachItem.user_rating.rating,
      ratingColor: eachItem.user_rating.rating_color,
      ratingText: eachItem.user_rating.rating_text,
      totalReviews: eachItem.user_rating.total_reviews,
    }))
    console.log(updatedData)
    this.setState({restaurantsData: updatedData})
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getAllRestaurants)
  }

  render() {
    const {restaurantsData, activeOptionId} = this.state

    return (
      <>
        <RestaurantsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <div className="all-restaurants-container">
          {restaurantsData.map(eachRestaurant => (
            <RestaurantItem
              restaurantItem={eachRestaurant}
              key={eachRestaurant.id}
            />
          ))}
        </div>
      </>
    )
  }
}

export default AllRestaurants
