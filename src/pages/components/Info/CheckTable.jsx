import React, { Component } from 'react';
import { Button, Table, Select } from 'antd';

const { Option } = Select;
const dataSource = [
  {
    key: '0',
    time: '2020/7/3',
    ballNum: 200,
    ballArea: 423,
    // bfinishTime: '2020/7/17',
    // aallNum: ,
    // aallArea: ,
    // bfinishTime: '',
    // astatus: ''
  },
  {
    key: '1',
    time: '2019/7/1',
    ballNum: 161,
    ballArea: 222.28,
    bfinishTime: '2019/7/15',
    aallNum: 0,
    aallArea: 0,
    bfinishTime: '2019/7/29',
    astatus: '无',
  },
  {
    key: '2',
    time: '2018/7/1',
    ballNum: 99,
    ballArea: 200.28,
    bfinishTime: '2018/7/15',
    aallNum: 0,
    aallArea: 0,
    bfinishTime: '2018/7/29',
    astatus: '无',
  },
];

const columns = [
  {
    title: '日期',
    dataIndex: 'time',
    key: 'time',
    width: 70,
    align: 'center',
  },
  {
    title: '总损坏数目',
    dataIndex: 'ballNum',
    key: 'ballNum',
    width: 70,
    align: 'center',
  },
  {
    title: '总损坏面积(平方米)',
    dataIndex: 'ballArea',
    key: 'ballArea',
    width: 70,
    align: 'center',
  },
  {
    title: '检测完成日期',
    dataIndex: 'bfinishTime',
    key: 'bfinishTime',
    width: 70,
    align: 'center',
  },
  {
    title: '总损坏数目',
    dataIndex: 'aallNum',
    key: 'aallNum',
    width: 70,
    align: 'center',
  },
  {
    title: '总损坏面积(平方米)',
    dataIndex: 'aallArea',
    key: 'aallArea',
    width: 70,
    align: 'center',
  },
  {
    title: '检测完成日期',
    dataIndex: 'bfinishTime',
    key: 'afinishTime',
    width: 70,
    align: 'center',
  },
  {
    title: '损坏状态',
    dataIndex: 'astatus',
    key: 'astatus',
    width: 70,
    align: 'center',
  },
  {
    title: '操作',
    valueType: 'option',
    dataIndex: 'id',
    align: 'center',
    render: (text, row) => [
      <a key="1" href={row.html_url} target="_blank" rel="noopener noreferrer">
        查看
      </a>,
    ],
  },
];

class CheckTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      data: [],
    };
  }

  componentDidMount() {
    this.setState({
      data:dataSource
    })
    // console.log(Array.isArray(data))
  }

  handleTimeChange = e => {
    dataSource.map((item, index) => {
      if (index == e) {
        this.state.data = item;
      }
    });
    this.setState({
      value: e,
    });
    console.log(this.state.data); 
  };

  render() {
    return (
      <div className="infobox" style={{ right: 20 }}>
        {/* <div
          style={{ position: 'absolute', right: 15, top: 10, cursor: 'pointer' }}
          onClick={this.props.closeTable}
        >
          X
        </div> */}
        {/* <div style={{ marginTop: 15 }}> */}
        <div style={{ marginBottom: 10 }}>
          <label style={{ marginRight: 10 }}>日期选择</label>
          <Select
            placeholder={'选择日期'}
            style={{ width: 300, marginTop: 10 }}
            onChange={this.handleTimeChange}
          >
            <Option value="0">2020/7/3</Option>
            <Option value="1">2019/7/1</Option>
            <Option value="2">2018/7/1</Option>
          </Select>
        </div>

        <Table columns={columns} dataSource={this.state.data} />
      </div>
      // </div>
    );
  }
}

export default CheckTable;
