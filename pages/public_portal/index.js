import { Router, useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import HomeMenu from '../../components/homeMenu'
import Layout from '../../components/public_portal/Layout'
import s from '../../styles/public_portal/dashboard.module.css'
import { Chart, ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController, LineController, PieController, PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale, RadialLinearScale, TimeScale, TimeSeriesScale, Decimation, Filler, Legend, Title, Tooltip, SubTitle } from 'chart.js';
import baseApi from '../../api/baseApi'
import { BaseApi, sortArrayOfObjectsByProperty } from '../../helpers/functions'
import Select from 'react-select'
import ChartView from '../../components/ChartViewSelectedCandidates'
import ChartViewSelectedCandidates from '../../components/ChartViewSelectedCandidates'
import ChartViewFinal from '../../components/ChartViewFinal'
function PublicDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [instituteCounts, setInstituteCounts] = useState([])
  const [catID, setCatID] = useState('')
  const [categoryOpts, setCategoryOpts] = useState([])
  const [totalPublishedCountsBySession, setTotalPublishedCountsBySession] = useState([])


  useEffect(() => {
    BaseApi.get(`public/final-result/programs/status/published`).then(res => {
      setTotalPublishedCountsBySession(res.data.data)
    })
  }, [])


  useEffect(() => {
    baseApi.get(`/public/elimination-result/categories?session_id=1`).then(res => {
      setCategoryOpts([{ value: null, label: 'ALL' }])
      res.data.data.map(category => {
        setCategoryOpts(prev => [...prev, { value: category.id, label: category.name, category }])
      })
    })
  }, [])



  const handleCategorySelectChange = (category) => {

    setCatID(category?.id)

  }


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


  Chart.register(ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController, LineController, PieController, PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale, RadialLinearScale, TimeScale, TimeSeriesScale, Decimation, Filler, Legend, Title, Tooltip, SubTitle);


  useEffect(() => {
    loadChart()
  }, [catID])

  const loadChart = () => {
    let instis = []
    let count = []

    const chart_colors = {
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
    }
    baseApi.get(`/public/elimination-result/institutes/count/${catID}`).then((res) => {
      setInstituteCounts(res.data.data)
      instis = sortArrayOfObjectsByProperty(res.data.data, 'count', 'desc').map((item, index) => item.instituteShortName + ' -- ' + (index + 1))
      count = sortArrayOfObjectsByProperty(res.data.data, 'count', 'desc').map((item) => item.count)
    })
      .then(() => {
        Chart.register(ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController, LineController, PieController, PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale, RadialLinearScale, TimeScale, TimeSeriesScale, Decimation, Filler, Legend, Title, Tooltip, SubTitle);
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: instis,
            datasets: [{
              label: '# of Selected Candidates',
              data: count,
              ...chart_colors
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
      }).catch((err) => {
      }
      )
  }


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
          {totalPublishedCountsBySession.map((session, index) => {
            const totalPrograms = parseInt(instiTypes.find((type) => type.id == parseInt(session.sessionID))?.total_programs)
            const publishedPrograms = parseInt(session.totalProgramPublished)
            // const publishedPrograms = 108
            return (
              <div className={`${s.instiItem} ${s.statusPublished}`}
                data-published={publishedPrograms}
                data-total={totalPrograms}
                data-percent={`${Math.round((publishedPrograms / totalPrograms) * 100)}%`}
                key={index}
                style={{marginTop: '0',}}>
                <div className={s.status}
                  style={{width: `${Math.round((publishedPrograms / totalPrograms) * 100)}%`}}
                ></div>
                <p style={{zIndex:5, position:'relative'}}>{publishedPrograms} / {totalPrograms}</p>

              </div>
            )
          })}
        <div>
          <h2 style={{ padding: '1rem', color: '#9B3AE5' }}>Selected Candidates Rate</h2>
        </div>


        <ChartViewSelectedCandidates />
        <ChartViewFinal />



        <div className={s.quicklinkTotal}>
          <h2 className={s.quicklinkHeader}>QUICK LINKS</h2>
          <div className={s.quicklinks}>
            {quickLinks.map((link, index) => (
              <div className={s.quicklinkItem} key={index} onClick={() => router.push(link.link)}>
                <p>{link.name}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  )

}

export default PublicDashboard