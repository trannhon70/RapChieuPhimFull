import React, { Fragment, useEffect, useState } from 'react'
import { Table, Input, Button, Space } from 'antd';
import { AudioOutlined, CalendarOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachNguoiDungAction, xoaUserAction } from '../../../../redux/actions/QuanLyNguoiDungAction'
import { NavLink } from 'react-bootstrap';
import { history } from '../../../../App';

export default function User(props) {
  const { quanLyNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)
  const dispatch = useDispatch();
  // console.log('quanLyNguoiDung', quanLyNguoiDung);
  useEffect(() => {
    dispatch(layDanhSachNguoiDungAction());
  }, [])



  //table
  const data = quanLyNguoiDung;
  const [state, setState] = useState({
    searchText: '',
    searchedColumn: '',
  });

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            state.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>

        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => state.searchInput.select(), 100);
      }
    },
    render: text =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = clearFilters => {
    clearFilters();
    setState({ searchText: '' });
  };

  const columns = [
    {
      title: 'T??i kho???n',
      dataIndex: 'taiKhoan',
      key: 'taiKhoan',
      ...getColumnSearchProps('taiKhoan'),
    },
    {
      title: 'M???t kh???u',
      dataIndex: 'matKhau',
      key: 'matKhau',

    },
    {
      title: 'H??? v?? t??n ',
      dataIndex: 'hoTen',
      key: 'hoTen',
      ...getColumnSearchProps('hoTen'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',

    },
    {
      title: 'S??? ??i???n tho???i',
      dataIndex: 'soDt',
      key: 'soDt',

    },
    {
      title: 'Lo???i ng?????i d??ng',
      dataIndex: 'maLoaiNguoiDung',
      key: 'maLoaiNguoiDung',
      ...getColumnSearchProps('maLoaiNguoiDung'),
    },
    {
      title: 'Thao t??c',
      render: (text, user) => {
        console.log({user});
        return <Fragment>
          {<div className="flex">
            <NavLink to={`/admin/edituser/${user.email}`} key={1} className="text-2xl "><EditOutlined style={{ color: '#006400' }} /></NavLink>
            <span  key={2} className="text-2xl " style={{margin: 'auto', cursor: 'pointer'}}><DeleteOutlined style={{ color: 'red' }} onclick={()=>{
              //g???i action x??a user
              if(window.confirm('b???n c?? ch???c l?? mu???n x??a ng?????i d??ng ' + user.hoTen)){
                //g???i action
                dispatch(xoaUserAction(user.taiKhoan))
              }
            }} /></span>
            

          </div>}
        </Fragment>
      },
      



    },
  ];

  return (

    <div>
      <h3 className="text-center text-3xl">Qu???n l?? user</h3>
      <button className="btn btn-outline-success mb-3" onClick={() => {
        history.push('/admin/adduser')
      }}>Th??m ng?????i d??ng </button>
      <Table columns={columns} dataSource={data} />
    </div>

  )
}
