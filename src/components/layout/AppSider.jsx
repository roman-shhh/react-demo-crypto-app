import { Layout, Card, Statistic, Flex, Typography, Tag } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { capitalize } from '../../utils';
import { useCrypto } from '../../context/crypto-context';

const siderStyle = {
  padding: '1rem',
};

export default function AppSider() {
  const { assets } = useCrypto()

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map(asset => (
        <Card key={asset.id} style={{ marginBottom: '1rem' }}>
          <Statistic
            title={capitalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            styles={{ content: { color: asset.grow ? '#3f8600' : '#cf1322' } }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          {[
              { title: 'Total Profit', value: asset.totalProfit, withTag: true },
              { title: 'Asset Amount', value: asset.amount, isPlain: true }
            ].map((item) => (
              <Flex key={item.title} justify="space-between" style={{ padding: '4px 0' }}>
                <span>{item.title}</span>
                <span>
                  {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>}
                  {item.isPlain && item.value}
                  {!item.isPlain && <Typography.Text type={asset.grow ? 'success' : 'danger'}>{item.value.toFixed(2)}$</Typography.Text>}
                </span>
              </Flex>
            ))}
        </Card>
      ))}
    </Layout.Sider>
  )
}