import React, { Component } from 'react';
import { Button, Table, Select } from 'antd';

const { Option } = Select;
const dataSource = [
  {
    key: '0',
    time: '2020/7/3',
    ballNum: 200,
    ballArea: 423,
    bfinishTime: '2020/7/17',
    // aallNum: ,
    // aallArea: ,
    // bfinishTime: '',
    // astatus: ''
  },
  {
    key: '1',
    time: '2019/7/1',
    ballNum: 161,
    bfinishTime: '2019/7/15',
    aallNum: 0,
    afinishTime: '2019/7/29',
    astatus: '无',
  },
  {
    key: '2',
    time: '2018/7/1',
    ballNum: 99,
    bfinishTime: '2018/7/15',
    aallNum: 0,
    afinishTime: '2018/7/29',
    astatus: '无',
  },
];

class CheckTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      Data: [],
      bg: 'yellow',
    };
  }

  componentDidMount() {
    this.state.Data = [];
    this.state.Data[0] = dataSource[0];
  }

  handleTimeChange = e => {
    console.log(e);
    this.state.Data = [];
    dataSource.map((item, index) => {
      if (index == e) {
        this.state.Data[0] = item;
      } else if (e == 'all') {
        this.state.Data = dataSource;
      }
    });
    this.setState({
      value: e,
    });
    // this.props.pushTable();
  };

  render() {
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
        className: 'color1',
      },
      {
        title: '检测完成日期',
        dataIndex: 'bfinishTime',
        key: 'bfinishTime',
        width: 70,
        align: 'center',
        className: 'color1',
      },
      {
        title: '总损坏数目',
        dataIndex: 'aallNum',
        key: 'aallNum',
        width: 70,
        align: 'center',
        className: 'color2',
      },
      {
        title: '检测完成日期',
        dataIndex: 'bfinishTime',
        key: 'afinishTime',
        width: 70,
        align: 'center',
        className: 'color2',
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
        render: (text, record, row) => [
          <a
            key="1"
            onClick={() => {
              this.props.showTable();
              this.props.backDate(this.state.date, this.state.value);
              this.props.pushTable(record);
            }}
          >
            查看
          </a>,
        ],
      },
    ];
    return (
      <div style={{ marginTop: 5, display: 'block' }}>
        <label style={{ marginRight: 10, marginBottom: 10 }}>检测日期</label>
        <Select
          placeholder={'选择日期'}
          style={{ width: 110, marginTop: 10, marginBottom: 10 }}
          onChange={this.handleTimeChange}
        >
          <Option value="0">2020/7/3</Option>
          <Option value="1">2019/7/1</Option>
          <Option value="2">2018/7/1</Option>
          <Option value="all">全部时间</Option>
        </Select>
        <Table
          columns={columns}
          // rowClassName={(record, index) => {
          //   if (record.key == this.state.bg) {
          //     return 'bg';
          //   }
          // }}
          dataSource={this.state.Data}
          size="small"
          // onRow={record => {
          //   return {
          //     onClick: event => {
          //       console.log(record.time);
          //       this.setState({ date: record.time });
          //       this.props.backDate(this.state.date, this.state.value);
          //       this.props.pushTable();
          //     }, // 鼠标移入行
          //   };
          // }}
        />
        <div style={{ float: 'left', marginLeft: 10, marginTop: -40 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className="colorbox" style={{ backgroundColor: '#002743' }}></span>
            <span style={{ fontSize: 12, marginLeft: 10 }}>检测结果</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className="colorbox" style={{ backgroundColor: '#415b7' }}></span>
            <span style={{ fontSize: 12, marginLeft: 10 }}>修复后结果</span>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckTable;
