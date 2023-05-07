import Head from 'next/head'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Table from '@/components/Table'
import Form from '@/components/Form'
import { useState } from 'react'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [dataForm, setDataForm] = useState(null)

  const handleData = (data) => {
    setDataForm(data)
  }

  return (
    <>
      <Head>
        <title>Calculadora Dieta</title>
        <meta name="description" content="Made with <3 & </> for Arely by Ulises" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className='container'>
        <Form onDataProcessed={handleData} />
        <div className='table-section'>
          <h3>Peso Actual</h3>
          {dataForm && (<Table headers={["IMC", "Peso Ideal", "P. Ajustado"]} data={[dataForm.primary.IMC, dataForm.primary.ideal, dataForm.primary.adjusted]} />)}
          {dataForm && (<Table headers={["Benedict", "ETA", "FAF", "Total"]} data={[dataForm.current.benedict, dataForm.current.benedictETA, dataForm.current.benedictFAF, dataForm.current.benedictTotal]} />)}
          {dataForm && (<Table headers={["Mifflin", "ETA", "FAF", "Total"]} data={[dataForm.current.mifflin, dataForm.current.mifflintETA, dataForm.current.mifflinFAF, dataForm.current.mifflinTotal]} />)}
          <h3>Peso Ajustado</h3>
          {dataForm && (<Table headers={["Benedict", "ETA", "FAF", "Total"]} data={[dataForm.adjusted.benedict, dataForm.adjusted.benedictETA, dataForm.adjusted.benedictFAF, dataForm.adjusted.benedictTotal]} />)}
          {dataForm && (<Table headers={["Mifflin", "ETA", "FAF", "Total"]} data={[dataForm.adjusted.mifflin, dataForm.adjusted.mifflintETA, dataForm.adjusted.mifflinFAF, dataForm.adjusted.mifflinTotal]} />)}
          <h3>Peso Ideal</h3>
          {dataForm && (<Table headers={["Benedict", "ETA", "FAF", "Total"]} data={[dataForm.ideal.benedict, dataForm.ideal.benedictETA, dataForm.ideal.benedictFAF, dataForm.ideal.benedictTotal]} />)}
          {dataForm && (<Table headers={["Mifflin", "ETA", "FAF", "Total"]} data={[dataForm.ideal.mifflin, dataForm.ideal.mifflintETA, dataForm.ideal.mifflinFAF, dataForm.ideal.mifflinTotal]} />)}
        </div>
      </main>
    </>
  )
}
