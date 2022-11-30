import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Layout from '../../components/public_portal/Layout'
import Timeline from '../../components/schedule-timeline/timeline'
import { BaseApi } from '../../helpers/functions'
import schedule_sample from '../../helpers/schedule_sample.json'


function Schedule() {
  const days = [
    // { day: 'Day 1', date: '2022-11-30 00:00:00' },
    { day: 'Day 1', date: '2022-12-01 00:00:00' },
    { day: 'Day 2', date: '2022-12-02 00:00:00' },
    { day: 'Day 3', date: '2022-12-03 00:00:00' },
    { day: 'Day 4', date: '2022-12-04 00:00:00' },
  ]

  const venues = [
    { venue: 'Venue 1', name: 'Venue 1', type: 'stage' },
    { venue: 'Venue 2', name: 'Venue 2', type: 'stage' },
    { venue: 'Venue 3', name: 'Venue 3', type: 'stage' },
    { venue: 'Venue 4', name: 'Venue 4', type: 'stage' },
    { venue: 'Venue 5', name: 'Venue 5', type: 'stage' },
    { venue: 'Venue 6', name: 'Venue 6', type: 'stage' },
    { venue: 'Venue 7', name: 'Venue 7', type: 'stage' },
    { venue: 'Venue 8', name: 'Venue 8', type: 'non-stage' },
    { venue: 'Venue 9A', name: 'Venue 9A', type: 'non-stage' },
    { venue: 'Venue 9B', name: 'Venue 9B', type: 'non-stage' },
    { venue: 'Venue 10', name: 'Venue 10', type: 'stage' },
    { venue: 'Venue 11', name: 'Venue 11', type: 'stage' },
    { venue: 'Open', name: 'Open', type: 'non-stage' },
    { venue: 'Close', name: 'Close', type: 'stage' },
  ]
  // const data = [
  //   {
  //     id: 1,
  //     code: "BV1",
  //     category: "BIDAYA",
  //     name: "DICTIONARY MAKING ARB",
  //     date: "03-12-2022",
  //     s_time: "10:00 AM",
  //     e_time: "11:00 AM",
  //     venue: "Venue 1",
  //     duration: 30
  //   },
  //   {
  //     id: 1,
  //     code: "BV2",
  //     category: "BIDAYA",
  //     name: "DICTIONARY MAKING URD",
  //     date: "03-12-2022",
  //     s_time: "10:00 AM",
  //     e_time: "11:00 AM",
  //     venue: "Venue 2",
  //     duration: 30
  //   },
  // ]

  const data = schedule_sample

  const [scheduleData, setScheduleData] = useState([])
  useEffect(() => {
    BaseApi.get('public/programs/schedule').then(res => {
      setScheduleData(res.data.data)
      console.log(res.data.data[0].date)
    })
  }, [])

  return (
    <Layout openedTabName='schedule' style={{ overflow: 'hidden', background: '#f8f3fc' }}>
      <h1>Program schedule</h1>
      {/* <Timeline data={scheduleData} days={days} venues={venues} /> */}
      <Timeline data={scheduleData} days={days} venues={venues} />
    </Layout>
  )
}

export default Schedule
