import React from 'react'
import { useState } from 'react'
import HomeMenu from '../../components/homeMenu'
import ImgHome from '../../public/assets/svg/home.svg'
import ImgClose from '../../public/assets/svg/close.svg'
import Layout from '../../components/layout'
import s from '../../styles/public_portal/layout.module.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
function PublicPortalLayout({ children, openedTabName, style ={} }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPortalMenuOpen, setIsPortalMenuOpen] = useState(true)
  const menuItems = [
    {
      id: 1,
      name: 'Dashboard',
      link: '/public_portal'
    },
    {
      id: 2,
      name: `Elimination \n Results`,
      link: '/public_portal/elimination_results'
    },
    {
      id: 3,
      name: `Elimination \n Results \n of Institutions`,
      link: '/public_portal/elimination_results_of_institutes'
    },
    // {
    //   id: 3,
    //   name: 'Schedule',
    //   link: '/public_portal/schedules'
    // }
  ]

  const router = useRouter()
  useEffect(() => {
    if(window.innerWidth < 768) {
      setIsPortalMenuOpen(false)
    }
  }, [])
  
  return (
    <div className={s.portal}>

      <HomeMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}  />
      <aside className={`${s.sideMenu} ${isPortalMenuOpen ? s.isOpen : ''}`} >
        <div className={s.showMenu} onClick={() => setIsPortalMenuOpen(true)}>
          <div className={s.bar}></div>
          <div className={s.bar}></div>
          <div className={s.bar}></div>
        </div>
        <div className={s.buttons}>
          <div className={s.bars} onClick={() => setIsMenuOpen(true)}>
            <div className={s.bar}></div>
            <div className={s.bar}></div>
            <div className={s.bar}></div>
          </div>
          <ImgHome className={s.btnHomeImg} width={40} onClick={() => router.push('/')}></ImgHome>
          <div className="flex-grow"></div>
          <ImgClose className={s.btnClose} onClick={() => setIsPortalMenuOpen(false)}></ImgClose>

          <div className={s.close}></div>
        </div>
        <p className={s.sibaqShadowText}>SIBAQ 2022</p>


        <div className={s.tabs}>
          <ul>
            {
              menuItems.map((item, index) =>
                <li className={openedTabName.toLowerCase() == item.name.toLowerCase() ? s.active : ''} onClick={() => router.push(item.link)} key={index}>{item.name}</li>
              )
            }
          </ul>

        </div>
      </aside>
      <div className={s.container} style={style}>
        <ToastContainer style={{ fontSize: '1.5rem' }}
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored" />
        {children}
      </div>
    </div>
  )
}

export default PublicPortalLayout