import { FormEvent, useContext, useEffect, useState, useRef } from "react"
import swal from '@sweetalert/with-react';

import { AuthContext } from "../contexts/AuthContext"
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth"
import { Can } from "../components/Can";
import styles from '../styles/Home.module.css';

export default function Dashboard() {
  const { user, signOut, balance } = useContext(AuthContext)
  const [file, setFile] = useState({ preview: '', data: '' });

  const ref = useRef(null);

  const reset = () => {
    ref.current.value = "";
  };

  const showBalance = () => {
    swal({
      title: "Seu saldo atual total",
      text: `Saldo total: ${balance.total}`,
      icon: "info"
    });
  }

  const handleFileChange = (e) => {
    const file = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setFile(file)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    let formData = new FormData()
    formData.append('file', file.data)

    if (file.data) {
        const response = await api.post('/transactions/import', formData);
        setFile({ preview: '', data: '' });

        if (response.status == 201) {
            swal({
                title: "Deu certo",
                text: "Transações importadas com sucesso!",
                icon: 'success',
            }).then(() => {
                window.location.reload();
            });
        } else {
            swal({
                title: "Falhou :(",
                text: "Ocorreu um problema!",
                type: "warning"
            });
        }
    } else {
        alert("É necessário selecionar um arquivo.");
    }

  }

  useEffect(() => {
    api.get('/auth/me')
  }, [])

  return (
    <>
      <h1>Welcome {user?.email}</h1>

      <button onClick={showBalance}>Checar meu saldo</button>
      |
      <button onClick={signOut}>Sair</button>

      <Can roles={['PRODUCER']}>
        <form onSubmit={handleSubmit} className={styles.container}>
          <input type="file" name='file' ref={ref} onChange={handleFileChange} accept='.txt' /><br />
          <button onClick={reset} type="submit">Importar arquivos</button>
        </form>
      </Can>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  await apiClient.get('/auth/me');

  return {
    props: {

    }
  }
})
