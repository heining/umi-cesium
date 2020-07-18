/**
 * @ 数据表格
 * date: 2020-07-18
 * @param props
 */

import React, { useState, useEffect } from 'react';
import { Table, Row, Col } from 'antd';
import styles from './index.less';

const TableInsky = props => {
  console.log(props.data);
  const { data, date } = props;
  // let _state = 'white';
  // if (data['1'][2] == '待修复...') {
  //   _state = 'red';
  // }
  // const ["white", setState] = useState(_state);
  // if (data['1'][2] == '待修复...' && _state == 'white') {
  //   _state = 'red';
  //   setState({ state: 'red' });
  // }else{
  //   setState({ state: 'white' });
  // }

  // 数据处理
  return (
    <div
      style={{
        ...props.style,
        border: '2px solid white',
        backgroundColor: 'rgba(6, 64, 102, 0.8)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', borderBottom: '0.5px solid white' }}>
        <div className={styles.col3} style={{ borderRight: '0.5px solid white', color: 'white' }}>
          任务日期
        </div>
        <div className={styles.col6} style={{ borderRight: '0.5px solid white', color: 'white' }}>
          {date}
        </div>
        <div className={styles.col8} style={{ borderRight: '0.5px solid white', color: 'white' }}>
          检测结果
        </div>
        <div className={styles.col8} style={{ color: 'white' }}>
          修复后结果
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '0.5px solid white',
          flexFlow: 'row wrap',
          minHeight: '100%',
        }}
      >
        <div
          className={styles.col3}
          style={{
            borderRight: '0.5px solid white',
            color: 'white',
            height: 48,
            lineHeight: '48px',
          }}
        >
          序号
        </div>
        <div
          className={styles.col6}
          style={{
            borderRight: '0.5px solid white',
            color: 'white',
            height: 48,
            lineHeight: '48px',
          }}
        >
          项目
        </div>
        <div
          className={styles.col4}
          style={{
            borderRight: '0.5px solid white',
            color: 'white',
            height: 48,
            lineHeight: '48px',
          }}
        >
          损坏数目
        </div>
        <div
          className={styles.col4}
          style={{
            borderRight: '0.5px solid white',
            color: 'white',
            height: 48,
            lineHeight: '24px',
          }}
        >
          损坏面积
          <br />
          (平方米)
        </div>
        <div
          className={styles.col4}
          style={{
            borderRight: '0.5px solid white',
            color: 'white',
            height: 48,
            lineHeight: '48px',
          }}
        >
          损坏数目
        </div>
        <div className={styles.col4} style={{ color: 'white', height: 48, lineHeight: '24px' }}>
          损坏面积
          <br />
          (平方米)
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '0.5px solid white',
          flexFlow: 'row wrap',
          minHeight: '100%',
        }}
      >
        <div
          className={styles.col3}
          style={{
            borderRight: '0.5px solid white',
            color: 'white',
            height: 48,
            lineHeight: '48px',
          }}
        >
          1
        </div>
        <div
          className={styles.col6}
          style={{
            borderRight: '0.5px solid white',
            color: 'white',
            height: 48,
            lineHeight: '48px',
          }}
        >
          幕墙面板
        </div>
        <div
          className={styles.col4}
          style={{ borderRight: '0.5px solid white', color: "white", height: 48, lineHeight: '48px' }}
        >
          {data['1'][0]}
        </div>
        <div
          className={styles.col4}
          style={{ borderRight: '0.5px solid white', color: "white", height: 48, lineHeight: '48px' }}
        >
          {data['1'][1]}
        </div>
        <div
          className={styles.col4}
          style={{ borderRight: '0.5px solid white', color: "white", height: 48, lineHeight: '48px' }}
        >
          {data['1'][2]}
        </div>
        <div className={styles.col4} style={{ color: 'white', height: 48, lineHeight: '48px' }}>
          {data['1'][3]}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '0.5px solid white',
          flexFlow: 'row wrap',
          minHeight: '100%',
        }}
      >
        <div
          className={styles.col3}
          style={{
            borderRight: '0.5px solid white',
            color: 'white',
            height: 48,
            lineHeight: '48px',
          }}
        >
          2
        </div>
        <div
          className={styles.col6}
          style={{
            borderRight: '0.5px solid white',
            color: 'white',
            height: 48,
            lineHeight: '48px',
          }}
        >
          外露构件
        </div>
        <div
          className={styles.col4}
          style={{ borderRight: '0.5px solid white', color: "white", height: 48, lineHeight: '48px' }}
        >
          {data['2'][0]}
        </div>
        <div
          className={styles.col4}
          style={{
            borderRight: '0.5px solid white',
            color: 'white',
            height: 48,
            lineHeight: '48px',
          }}
        >
          /
        </div>
        <div
          className={styles.col4}
          style={{ borderRight: '0.5px solid white', color: "white", height: 48, lineHeight: '48px' }}
        >
          {data['2'][2]}
        </div>
        <div className={styles.col4} style={{ color: 'white', height: 48, lineHeight: '48px' }}>
          /
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '0.5px solid white',
          flexFlow: 'row wrap',
          minHeight: '100%',
        }}
      >
        <div
          className={styles.col3}
          style={{
            borderRight: '0.5px solid white',
            color: 'white',
            height: 54,
            lineHeight: '54px',
          }}
        >
          3
        </div>
        <div
          className={styles.col6}
          style={{
            borderRight: '0.5px solid white',
            color: 'white',
            height: 54,
            lineHeight: '18px',
          }}
        >
          承力构件
          <br />
          连接件
          <br />
          连接螺栓
        </div>
        <div
          className={styles.col4}
          style={{ borderRight: '0.5px solid white', color: "white", height: 54, lineHeight: '54px' }}
        >
          {data['3'][0]}
        </div>
        <div
          className={styles.col4}
          style={{
            borderRight: '0.5px solid white',
            color: 'white',
            height: 54,
            lineHeight: '54px',
          }}
        >
          /
        </div>
        <div
          className={styles.col4}
          style={{ borderRight: '0.5px solid white', color: "white", height: 54, lineHeight: '54px' }}
        >
          {data['3'][2]}
        </div>
        <div className={styles.col4} style={{ color: 'white', height: 54, lineHeight: '54px' }}>
          /
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '0.5px solid white',
          flexFlow: 'row wrap',
          minHeight: '100%',
        }}
      >
        <div
          className={styles.col3}
          style={{
            borderRight: '0.5px solid white',
            color: 'white',
            height: 84,
            lineHeight: '84px',
          }}
        >
          4
        </div>
        <div
          className={styles.col6}
          style={{
            borderRight: '0.5px solid white',
            color: 'white',
            height: 84,
            lineHeight: '84px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <div
              style={{
                width: '50%',
                height: '100%',
                lineHeight: '28px',
                borderRightWidth: 0.5,
                borderRightColor: 'white',
                borderRightStyle: 'solid',
              }}
            >
              硅酮密封
              <br />
              胶、密封
              <br />
              胶条
            </div>
            <div style={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  height: '25%',
                  lineHeight: '18px',
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'white',
                  borderBottomStyle: 'solid',
                }}
              >
                主楼
              </div>
              <div
                style={{
                  height: '25%',
                  lineHeight: '18px',
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'white',
                  borderBottomStyle: 'solid',
                }}
              >
                裙楼
              </div>
              <div
                style={{
                  height: '25%',
                  lineHeight: '18px',
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'white',
                  borderBottomStyle: 'solid',
                }}
              >
                总共
              </div>
              <div style={{ height: '25%', lineHeight: '18px', borderBottomWidth: 0.5 }}>影响</div>
            </div>
          </div>
        </div>
        <div
          className={styles.col4}
          style={{ borderRight: '0.5px solid white', color: "white", height: 84, lineHeight: '84px' }}
        >
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                height: '25%',
                lineHeight: '18px',
                borderBottomWidth: 0.5,
                borderBottomColor: 'white',
                borderBottomStyle: 'solid',
              }}
            >
              {data['41'][0]}
            </div>
            <div
              style={{
                height: '25%',
                lineHeight: '18px',
                borderBottomWidth: 0.5,
                borderBottomColor: 'white',
                borderBottomStyle: 'solid',
              }}
            >
              {data['42'][0]}
            </div>
            <div
              style={{
                height: '25%',
                lineHeight: '18px',
                borderBottomWidth: 0.5,
                borderBottomColor: 'white',
                borderBottomStyle: 'solid',
              }}
            >
              {data['43'][0]}
            </div>
            <div style={{ height: '25%', lineHeight: '18px', borderBottomWidth: 0.5 }}>
              {data['44'][0]}
            </div>
          </div>
        </div>
        <div
          className={styles.col4}
          style={{ borderRight: '0.5px solid white', color: "white", height: 84, lineHeight: '27px' }}
        >
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                height: '25%',
                lineHeight: '18px',
                borderBottomWidth: 0.5,
                borderBottomColor: 'white',
                borderBottomStyle: 'solid',
              }}
            >
              {data['41'][1]}
            </div>
            <div
              style={{
                height: '25%',
                lineHeight: '18px',
                borderBottomWidth: 0.5,
                borderBottomColor: 'white',
                borderBottomStyle: 'solid',
              }}
            >
              {data['42'][1]}
            </div>
            <div
              style={{
                height: '25%',
                lineHeight: '18px',
                borderBottomWidth: 0.5,
                borderBottomColor: 'white',
                borderBottomStyle: 'solid',
              }}
            >
              {data['43'][1]}
            </div>
            <div style={{ height: '25%', lineHeight: '18px', borderBottomWidth: 0.5 }}>
              {data['44'][1]}
            </div>
          </div>
        </div>
        <div
          className={styles.col4}
          style={{ borderRight: '0.5px solid white', color: "white", height: 84, lineHeight: '84px' }}
        >
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                height: '25%',
                lineHeight: '18px',
                borderBottomWidth: 0.5,
                borderBottomColor: 'white',
                borderBottomStyle: 'solid',
              }}
            >
              {data['41'][2]}
            </div>
            <div
              style={{
                height: '25%',
                lineHeight: '18px',
                borderBottomWidth: 0.5,
                borderBottomColor: 'white',
                borderBottomStyle: 'solid',
              }}
            >
              {data['42'][2]}
            </div>
            <div
              style={{
                height: '25%',
                lineHeight: '18px',
                borderBottomWidth: 0.5,
                borderBottomColor: 'white',
                borderBottomStyle: 'solid',
              }}
            >
              {data['43'][2]}
            </div>
            <div style={{ height: '25%', lineHeight: '18px', borderBottomWidth: 0.5 }}>
              {data['44'][2]}
            </div>
          </div>
        </div>
        <div className={styles.col4} style={{ color: "white", height: 84, lineHeight: '27px' }}>
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                height: '25%',
                lineHeight: '18px',
                borderBottomWidth: 0.5,
                borderBottomColor: 'white',
                borderBottomStyle: 'solid',
              }}
            >
              {data['41'][3]}
            </div>
            <div
              style={{
                height: '25%',
                lineHeight: '18px',
                borderBottomWidth: 0.5,
                borderBottomColor: 'white',
                borderBottomStyle: 'solid',
              }}
            >
              {data['42'][3]}
            </div>
            <div
              style={{
                height: '25%',
                lineHeight: '18px',
                borderBottomWidth: 0.5,
                borderBottomColor: 'white',
                borderBottomStyle: 'solid',
              }}
            >
              {data['43'][3]}
            </div>
            <div style={{ height: '25%', lineHeight: '18px', borderBottomWidth: 0.5 }}>
              {data['44'][3]}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '0.5px solid white',
          flexFlow: 'row wrap',
          minHeight: '100%',
        }}
      >
        <div
          className={styles.col3}
          style={{
            borderRight: '0.5px solid white',
            color: 'white',
            height: 48,
            lineHeight: '48px',
          }}
        >
          5
        </div>
        <div
          className={styles.col6}
          style={{
            borderRight: '0.5px solid white',
            color: 'white',
            height: 48,
            lineHeight: '48px',
          }}
        >
          开启系统
        </div>
        <div
          className={styles.col4}
          style={{ borderRight: '0.5px solid white', color: "white", height: 48, lineHeight: '48px' }}
        >
          {data['5'][0]}
        </div>
        <div
          className={styles.col4}
          style={{ borderRight: '0.5px solid white', color: "white", height: 48, lineHeight: '48px' }}
        >
          {data['5'][1]}
        </div>
        <div
          className={styles.col4}
          style={{ borderRight: '0.5px solid white', color: "white", height: 48, lineHeight: '48px' }}
        >
          {data['5'][2]}
        </div>
        <div className={styles.col4} style={{ color: 'white', height: 48, lineHeight: '48px' }}>
          {data['5'][3]}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '0.5px solid white',
          flexFlow: 'row wrap',
          minHeight: '100%',
        }}
      >
        <div
          className={styles.col3}
          style={{
            borderRight: '0.5px solid white',
            color: 'white',
            height: 48,
            lineHeight: '48px',
          }}
        >
          6
        </div>
        <div
          className={styles.col6}
          style={{
            borderRight: '0.5px solid white',
            color: 'white',
            height: 48,
            lineHeight: '48px',
          }}
        >
          渗漏水
        </div>
        <div
          className={styles.col4}
          style={{ borderRight: '0.5px solid white', color: "white", height: 48, lineHeight: '48px' }}
        >
          {data['6'][0]}
        </div>
        <div
          className={styles.col4}
          style={{ borderRight: '0.5px solid white', color: "white", height: 48, lineHeight: '48px' }}
        >
          {data['6'][1]}
        </div>
        <div
          className={styles.col4}
          style={{ borderRight: '0.5px solid white', color: "white", height: 48, lineHeight: '48px' }}
        >
          {data['6'][2]}
        </div>
        <div className={styles.col4} style={{ color: 'white', height: 48, lineHeight: '48px' }}>
          {data['6'][3]}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', minHeight: '100%' }}>
        <div
          className={styles.col3}
          style={{
            borderRight: '0.5px solid white',
            color: 'white',
            height: 48,
            lineHeight: '48px',
          }}
        >
          7
        </div>
        <div
          className={styles.col6}
          style={{
            borderRight: '0.5px solid white',
            color: 'white',
            height: 48,
            lineHeight: '24px',
          }}
        >
          硅酮结构密封胶及
          <br />
          粘接性能
        </div>
        <div
          className={styles.col4}
          style={{ borderRight: '0.5px solid white', color: "white", height: 48, lineHeight: '48px' }}
        >
          {data['7'][0]}
        </div>
        <div
          className={styles.col4}
          style={{ borderRight: '0.5px solid white', color: "white", height: 48, lineHeight: '48px' }}
        >
          {data['7'][1]}
        </div>
        <div
          className={styles.col4}
          style={{ borderRight: '0.5px solid white', color: "white", height: 48, lineHeight: '48px' }}
        >
          {data['7'][2]}
        </div>
        <div className={styles.col4} style={{ color: 'white', height: 48, lineHeight: '48px' }}>
          {data['7'][3]}
        </div>
      </div>
    </div>
  );
};

export default TableInsky;
