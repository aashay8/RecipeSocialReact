import React from 'react';
import { Menu, Layout } from 'antd';
const { Sider } = Layout

class RecipeSidebar extends React.Component {
    constructor(props) {
        super(props)

        this.state = { categories: [] }
    }

    handleClick = e => {
        if (!this.props.disableUnconnected)
            this.props.onSearch(e.key);
    }

    componentWillMount() {
        fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then(response => response.json())
            .then(data => {
                this.setState({ categories: data.categories })
            })

    }

    render() {
        let { categories } = this.state;
        return (
            <div breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    marginTop: '10vh'
                }}
            >

                <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']} onClick={this.handleClick}>
                    <Menu.Item key={"_"}>
                        <span className="nav-text">All</span>
                    </Menu.Item>
                    {categories.map(cat =>
                        <Menu.Item key={cat.strCategory}>
                            <span className="nav-text" >{cat.strCategory}</span>
                        </Menu.Item>
                    )}

                </Menu>
            </div>
        )
    }
}

export default RecipeSidebar;