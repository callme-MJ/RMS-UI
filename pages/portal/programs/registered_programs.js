import React, { useEffect, useState } from 'react'
import Input from '../../../components/portal/inputTheme';
import Portal_Layout from '../../../components/portal/portal_Layout'
import styles from '../../../styles/portals/input_table.module.css'
import Data_table from '../../../components/portal/data_table';
import EditIcon from '../../../public/assets/svg/edit.svg'
import DeleteIcon from '../../../public/assets/svg/delete.svg'
import baseApi from '../../../api/baseApi';
import { toast } from 'react-toastify';
import { apiDelete, apiGet, apiPatch, apiPost, downloadExcel, useGet } from '../../../helpers/functions';
import Select from 'react-select';


// import Input from '../../../components/portal/inputTheme';

function Categories() {
  // const [categories, setCategories] = useState([]);
  const [chestNoSeries, setChestNoSeries] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [process, setProcess] = useState('add');
  const [isLoading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectedCatID, setSelectedCatID] = useState(2);

  const [catID, setCatID] = useState('1');
  const [programCode, setProgramCode] = useState('');
  const [name, setName] = useState('');
  const [candCount, setCandCount] = useState('');
  const [candDetail, setCandDetail] = useState([]);
  const [programId, setprogramId] = useState()
  const [prefix, setPrefix] = useState('')
  const [category, setCategory] = useState("")
  const [categories, setCategories] = useState([])



  // let categories = []
  // categories = useGet(`/coordinator/categories`)[0]
  let coordinator = []
  coordinator = useGet(`/coordinator/me`)[0];

  useEffect(() => {
    baseApi.get("/coordinator/categories").then(res => setCategories(res.data.data)).then(() => categories && setCategory(categories[0]?.id))
    baseApi.get('/coordinator/me').then((res) => {
      setPrefix(res.data.data.institute_id.session.chest_no_prefix)
    })
  }, [category])

  let regPrograms;
  regPrograms = useGet('coordinator/candidate-programs')[0]

  //  

  let candidates;
  candidates = useGet(`/coordinator/candidates`)[0]?.candidates;

  const clearForm = () => {
    setProcess('add')
    setName("")
    setChestNoSeries("")
    setCandCount("")
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    candDetail.map((item) => {

      const data = {
        chestNO: item.chestNO,
        programCode,
        categoryID: selectedCatID,
        programName: name,
        instituteID: coordinator.institute_id.id,
      }
      apiPatch('coordinator/candidate-programs/' + programId, data, false, false, false, () => { setSubmitting(false); loadTableData() })
    }
    );
  }
  const handleDelete = (e, id) => {
    let row = e.target.parentNode.parentNode;
    apiDelete('coordinator/candidate-programs/', id, () => {
      setSubmitting(false);
      row.remove()
      setProgramCode('')
      setName('')
      setCandCount('')
    })
  }

  const handleChange = (selectedOption, programCode) => {
    setSelectedOption(selectedOption.value);
    setCandDetail([...candDetail, { chestNO: selectedOption.chestNO, name: selectedOption.name }])

  };
  const handleRowClick = (e, id) => {
    let row = e.target.parentNode;
    setprogramId(id)
    setCandDetail([])
    if (row.cells) {
      setProgramCode(row?.cells[1] && row?.cells[1]?.innerText)
      setName(row?.cells[2].innerText)
      const count = row?.cells[5].innerText
      setCandCount(count === '' || count === undefined || count === null || count === 1 ? 1 : count)
    }
  }
  const loadTableData = async () => {

  }
  const heads =  ['SI.', 'Program code', 'Program ', "Chest No.", "Candidate name"]
  const candOptions = candidates?.filter(cand => cand.categoryID == catID).map((item, index) => {
    return { value: item.id, label: item.chestNO + ' - ' + item.name, chestNO: item.chestNO, name: item.name }
  })
  return (
    <Portal_Layout activeTabName='Programs' activeChildTabName='Registered programs' userType='institute'>
      <div className={styles.pageContainer}>
        <h1>Registered programs</h1>
        <span data-theme='hr'></span>
        <Input type='dropdown' dropdownOpts={categories} handleOnChange={(e) => setCatID(e.target.value)} label='Select category' placeholder={'Program code'} name='programCode' status='normal' />
        <div className={styles.dataContainer}>

          <div className={styles.forms} style={{ display: 'none' }}>
            <h2>Edit program registration</h2>
            <div className={styles.formContainer} data-theme='formContainer' style={{ height: '70vh', width: '100%' }}>
              <Input type='dropdown' dropdownOpts={categories} handleOnChange={(e) => setCatID(e.target.value)} label='Select category' placeholder={'Program code'} name='programCode' status='normal' />
              <form action="#" style={{ display: 'flex' }}>
                <Input value={programCode} handleOnChange={() => setProgramCode(e.target.value)} label='Program code' placeholder={'Program code'} name='programCode' isDisabled={true} status='normal' />
                <Input value={name} handleOnChange={() => setName(e.target.value)} label='Program name' placeholder={'Program name'} name='name' isDisabled={true} status='normal' />
                <Input value={candCount} handleOnChange={() => setCandCount(e.target.value)} label='Candidate count' placeholder={'Candidate count'} name='groupCount' isDisabled={true} status='normal' style={{ marginBottom: '2rem' }} />
                <p>Candidates</p>
                {
                  // if()
                  Array.from({ length: candCount }, (x, i) => {
                    return (
                      <div style={{ marginTop: '1rem', width: '100%' }} key={i}>
                        <Select
                          value={selectedOption.name}
                          onChange={index => handleChange(index)}
                          options={candOptions}
                          placeholder='Select candidate..'
                        />
                      </div>
                    )
                  })
                  // Array.from(Array(3)).forEach((x, i) => {
                  // })
                }


                <div className={styles.formBtns} style={{ width: '100%' }}>
                  <button data-theme='submit' style={{ width: '70%', marginRight: '5%' }} onClick={handleSubmit}>
                    {!isSubmitting ? 'UPDATE' : 'Submitting...'}
                  </button>
                  <button data-theme='clear' style={{ width: '25%' }} onClick={() => clearForm()}>X</button>
                </div>
              </form>
            </div>
          </div>
          <div className={styles.tables}>
            <div className={styles.table_header}>

              <h2>Registered programs</h2>
              {/* <button data-theme={'edit'} onClick={() => downloadExcel(regPrograms)}>DownLoad Excel &darr;</button> */}
            </div>

            <div data-theme="table" style={{ height: '70vh' }}>
              {/* {isLoading ? <div style={{ width: '100%', height: '50rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <h2>Loading</h2> </div> : */}

              <Data_table id='institutesTable' heads={heads} >
                {regPrograms &&
                  regPrograms.filter(program => program.program.categoryID == catID).map((program, index) => {
                    let siNo = index + 1;
                    return (
                      // <tr key={index} onClick={(e) => handleRowClick(e)} style={{ cursor: 'pointer' }}>
                      <tr key={index} style={{ cursor: 'pointer' }}>
                        <td style={{ width: '1rem' }}>{siNo}</td>
                        <td style={{ width: '8rem' }}>{program?.programCode}</td>
                        <td style={{ width: '19rem' }}>{program.programName}</td>
                        <td style={{ width: '19rem' }}>{prefix}{program.chestNO}</td>
                        <td style={{ width: '19rem' }}>{program.candidate.name}</td>
                        {/* <td style={{ width: '19rem' }}>{program.groupCount}</td> */}
                        {false && <td style={{ width: '1rem' }}>

                          <button height={20} fill='red' data-theme='delete' onClick={(e) => handleDelete(e, program.id)}>
                            Remove
                          </button>
                        </td>}
                      </tr>
                    )

                  })
                }
              </Data_table>
              {/* } */}
            </div>
          </div>
        </div>
      </div>
    </Portal_Layout>
  )
}

export default Categories