import { Router, useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import HomeMenu from '../../components/homeMenu'
import Layout from '../../components/public_portal/Layout'
import s from '../../styles/public_portal/dashboard.module.css'
import { Chart, ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController, LineController, PieController, PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale, RadialLinearScale, TimeScale, TimeSeriesScale, Decimation, Filler, Legend, Title, Tooltip, SubTitle } from 'chart.js';
import baseApi from '../../api/baseApi'
function PublicDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [instituteCounts, setInstituteCounts] = useState([])

  const router = useRouter()
  const instiTypes = [
    {
      id: 1,
      name: 'GENERAL',
      total_institutes: 28,
      total_candidates: 3128,
      total_programs: 216,
      female: 64,
      male: 3064,
    },
    {
      id: 2,
      name: 'NIICS',
      total_institutes: 8,
      total_candidates: 656,
      total_programs: 152,
      female: 0,
      male: 656,
    },
  ]
  const counts = [
    {
      id: 1,
      name: 'Institutes',
      count: 36,
    },
    {
      id: 2,
      name: 'Candidates',
      count: 3784,
    },
    {
      id: 3,
      name: 'Programs',
      count: 368,
    },
  ]
  const quickLinks = [
    {
      id: 1,
      name: 'Elimination Results',
      link: '/public_portal/elimination_results',
    },
    {
      id: 2,
      name: 'Schedules',
      link: '/public_portal/schedules',
    },
  ]

  useEffect(() => {
    let instis = []
    let counts = []

    baseApi.get(`/public/elimination-result/institutes/count`).then((res) => {
      console.log('counts', res.data.data);
      setInstituteCounts(res.data.data)
      console.log(res.data.data.map((item) => item.instituteShortName))
      console.log(res.data.data.map((item) => item.count))
      instis = res.data.data.map((item) => item.instituteShortName)
      counts = res.data.data.map((item) => item.count)

    }).then(() => {

      Chart.register(ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController, LineController, PieController, PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale, RadialLinearScale, TimeScale, TimeSeriesScale, Decimation, Filler, Legend, Title, Tooltip, SubTitle);
      const ctx = document.getElementById('myChart').getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: instis,
          // labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
          datasets: [{
            label: '# of Selected Candidates',
            data: counts,
            // data: [12, 19, 3, 5, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      console.log('myChart', myChart)
    }).catch((err) => {
      console.log('err', err)
    }
    )
  }, [])
  function isCanvasEmpty(cnv) {
    const blank = document.createElement('canvas');

    blank.width = cnv.width;
    blank.height = cnv.height;

    return cnv.toDataURL() === blank.toDataURL();
  }

  return (
    <Layout openedTabName='dashboard'>
      <div className={s.container}>
        <div className={s.counts}>
          {counts.map((count, index) => (
            <div className={s.countItem} key={index}>
              <h2>{count.count}</h2>
              <h3>{count.name}</h3>
            </div>
          ))}
        </div>
        <div className={s.instituteTypes}>
          {instiTypes.map((type, index) => (
            <div className={s.instiItem} key={index}>
              <div className={s.header}>
                <h2>{type.name}</h2>
                <span className={s.line}></span>
              </div>
              <div className={s.body}>
                <h3>Total Institutes</h3>
                <p>{type.total_institutes}</p>
                <h3>Total Programs</h3>
                <p>{type.total_programs}</p>
                <h3>Total Candidates</h3>
                <p>{type.total_candidates}</p>
                <div className={s.genders}>
                  <h4>Male: {type.male}</h4>
                  <h4>Female: {type.female}</h4>
                </div>
                <div className={s.genderStatusBar}>
                  <div className={s.maleStatus} style={{ width: `${100 * (type.male / type.total_candidates)}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <h2 style={{padding:'1rem'}}>Selected Candidates Rate</h2>
        <div className={`${s.xScrollable}`}>
          <div className={s.chart}>
            <canvas className={s.chartCanvas} id="myChart" width="400" height={'200'}></canvas>
            {/* <canvas className={s.chartCanvasMobile} id="myChartMobile" width="400" height={'300'}></canvas> */}
          </div>
        </div>


        {/* <div className={s.quicklinkTotal}>
          <h2 className={s.quicklinkHeader}>QUICK LINKS</h2>
          <div className={s.quicklinks}>
            {quickLinks.map((link, index) => (
              <div className={s.quicklinkItem} key={index} onClick={()=> router.push(link.link)}>
                <p>{link.name}</p>
              </div>
            ))}
          </div>
        </div> */}

      </div>
    </Layout>
  )
}

export default PublicDashboard