import { useState } from 'react'
import { Inter } from 'next/font/google'

import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Table from '@/components/Table'
import Form from '@/components/Form'
import AcordionBody from '@/components/common/AcordionBody'
import AcordionItem from '@/components/common/AcordionItem'
import TableGoal from '@/components/TableGoal'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [dataForm, setDataForm] = useState(null);
  const [caloriasTotal, setCaloriasTotal] = useState(null)

  const handleData = (data) => {
    setDataForm(data)
  }

  return (
    <>
      <Head>
        <title>Calculadora Dieta</title>
        <meta name="description" content="Made with ❤️ for Arely by Ulises" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className='container mb-4'>
        <Form onDataProcessed={handleData} />
        <div className='table-section'>

          {dataForm && (
            <>
              <Table headers={["IMC", "Peso Ideal", "P. Ajustado"]} data={[dataForm.primary.IMC, dataForm.primary.ideal, dataForm.primary.adjusted]} />
              <AcordionBody>
                <AcordionItem title={"Peso Actual"} collapse={"One"}>
                  <Table headers={["Benedict", "ETA", "FAF", "Total"]} data={[dataForm.current.benedict, dataForm.current.benedictETA, dataForm.current.benedictFAF, dataForm.current.benedictTotal]} />
                  <Table headers={["Mifflin", "ETA", "FAF", "Total"]} data={[dataForm.current.mifflin, dataForm.current.mifflintETA, dataForm.current.mifflinFAF, dataForm.current.mifflinTotal]} />
                  <div className='d-flex justify-content-around align-items-center'>
                    <button onClick={() => setCaloriasTotal(dataForm.current.benedictTotal)} type="button" className="btn btn-primary">Benedict</button>
                    <button onClick={() => setCaloriasTotal(dataForm.current.mifflinTotal)} type="button" className="btn btn-primary">Mifflin</button>
                  </div>
                </AcordionItem>
                <AcordionItem title={"Peso Ajustado"} collapse={"Two"}>
                  <Table headers={["Benedict", "ETA", "FAF", "Total"]} data={[dataForm.adjusted.benedict, dataForm.adjusted.benedictETA, dataForm.adjusted.benedictFAF, dataForm.adjusted.benedictTotal]} />
                  <Table headers={["Mifflin", "ETA", "FAF", "Total"]} data={[dataForm.adjusted.mifflin, dataForm.adjusted.mifflintETA, dataForm.adjusted.mifflinFAF, dataForm.adjusted.mifflinTotal]} />
                  <div className='d-flex justify-content-around align-items-center'>
                    <button onClick={() => setCaloriasTotal(dataForm.adjusted.benedictTotal)} type="button" className="btn btn-primary">Benedict</button>
                    <button onClick={() => setCaloriasTotal(dataForm.adjusted.mifflinTotal)} type="button" className="btn btn-primary">Mifflin</button>
                  </div>
                </AcordionItem>
                <AcordionItem title={"Peso Ideal"} collapse={"Three"}>
                  <Table headers={["Benedict", "ETA", "FAF", "Total"]} data={[dataForm.ideal.benedict, dataForm.ideal.benedictETA, dataForm.ideal.benedictFAF, dataForm.ideal.benedictTotal]} />
                  <Table headers={["Mifflin", "ETA", "FAF", "Total"]} data={[dataForm.ideal.mifflin, dataForm.ideal.mifflintETA, dataForm.ideal.mifflinFAF, dataForm.ideal.mifflinTotal]} />
                  <div className='d-flex justify-content-around align-items-center'>
                    <button onClick={() => setCaloriasTotal(dataForm.ideal.benedictTotal)} type="button" className="btn btn-primary">Benedict</button>
                    <button onClick={() => setCaloriasTotal(dataForm.ideal.mifflinTotal)} type="button" className="btn btn-primary">Mifflin</button>
                  </div>
                </AcordionItem>
              </AcordionBody>
            </>
          )}

          {caloriasTotal && (<TableGoal caloriasTotal={caloriasTotal} goal={dataForm.primary.goal} />)}
        </div>
      </main>
    </>
  )
}
