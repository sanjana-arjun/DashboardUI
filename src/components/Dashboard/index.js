import {Component} from 'react'
import {RiDashboard2Line} from 'react-icons/ri'
import {BiUserCircle} from 'react-icons/bi'
import {AiOutlineSetting} from 'react-icons/ai'
import {MdOutlineLocalOffer} from 'react-icons/md'
import {AiOutlineSchedule} from 'react-icons/ai'
import Cookies from 'js-cookie'
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import Charts from '../ProductCard'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'

import './index.css'

const data = [
  {
    count: 809680,
    language: 'Telugu',
  },
  {
    count: 4555697,
    language: 'Hindi',
  },
  {
    count: 12345657,
    language: 'English',
  },
]

class Dashboard extends Component {
  state = {
    productsList: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/products'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        rating: product.rating,
        id: product.id,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
      })
    }
  }

  render() {
    const {productsList} = this.state
    return (
      <div className="container">
        <div className="leftcontainer">
          <p className="board">Board.</p>
          <nav className="nav">
            <div className="individualprop">
              <RiDashboard2Line size="10%" />
              <p className="navele">Dashboard</p>
            </div>
            <div className="individualprop">
              <MdOutlineLocalOffer />
              <p className="navele">Transcations</p>
            </div>
            <div className="individualprop">
              <AiOutlineSchedule />
              <p className="navele">Schdules</p>
            </div>
            <div className="individualprop">
              <BiUserCircle />
              <p className="navele">Users</p>
            </div>
            <div className="individualprop">
              <AiOutlineSetting />
              <p className="navele">Settings</p>
            </div>
            <div className="footer">
              <p>Help</p>
              <p>Contact us</p>
            </div>
          </nav>
        </div>
        <h1 className="dashboard">Dashboard</h1>
        <div className="rightcontainer">
          <div className="minicontainers">
            <div className="uppertotalcontainers">
              <p>Total Revenues</p>
              <MdOutlineLocalOffer />
            </div>
            <div className="uppertotalcontainers background1">
              <p>Total Transcations</p>
              <MdOutlineLocalOffer />
            </div>
            <div className="uppertotalcontainers background2">
              <p>Total Likes</p>
              <MdOutlineLocalOffer />
            </div>
            <div className="uppertotalcontainers background3">
              <p>Total Users</p>
              <BiUserCircle />
            </div>
          </div>

          <div>
            <Charts />
          </div>
          <div className="bottomdata">
            <ResponsiveContainer width="40%" height={200} className="piechart">
              <h1 className="topprod">Top Products</h1>
              <PieChart>
                <Pie
                  cx="70%"
                  cy="40%"
                  data={data}
                  startAngle={0}
                  endAngle={360}
                  innerRadius="40%"
                  outerRadius="70%"
                  dataKey="count"
                >
                  <Cell name="price" fill="#fecba6" />
                  <Cell name="rating" fill="#b3d23f" />
                  <Cell name="title" fill="#a44c9e" />
                </Pie>
                <Legend
                  iconType="circle"
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="meetinngcontainer">
              <div className="initialmeeting">
                <p className="schedule">Today's Schedule</p>
                <p>See All</p>
              </div>
              <div className="meeting">
                <p>Meeting with suppliers from home</p>
                <p>14:00-15:00</p>
                <p>at suresh road,kuta,Bali</p>
              </div>
              <div className="meeting meeting2">
                <p>Check operations at Gig's factory</p>
                <p>16:00-17:00</p>
                <p>at suresh road,kuta,Bali</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
