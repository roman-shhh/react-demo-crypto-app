import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { Suspense, lazy, useEffect, useState } from 'react';

const CryptoInfoModal = lazy(() => import('../CryptoInfoModal'));
const AddAssetForm = lazy(() => import('../AddAssetForm'));

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'enter',
};

export default function AppHeader() {
  const [select, setSelect] = useState(false)
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [coin, setCoin] = useState(null)
  const { crypto } = useCrypto()

  useEffect(() => {
    const keypress = event => {
      if (event.key === '/') {
        setSelect((prev) => !prev)
      }
    }
    document.addEventListener('keypress', keypress)
    return () => document.removeEventListener('keypress', keypress)
  }, [])

  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value))
    setModal(true)
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: 250 }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        value="press / to open"
        options={crypto.map(coin => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img style={{ width: 20 }} src={option.data.icon} alt={option.data.label} /> {option.data.label}
          </Space>
        )}
      />

      <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>

      <Suspense fallback={null}>
        <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
          <CryptoInfoModal coin={coin} />
        </Modal>
      </Suspense>

      <Suspense fallback={null}>
        <Drawer title="Add Asset" size={600} onClose={() => setDrawer(false)} open={drawer} destroyOnHidden>
          <AddAssetForm onClose={() => setDrawer(false)} />
        </Drawer>
      </Suspense>
    </Layout.Header>
  )
}