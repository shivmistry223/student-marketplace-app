import { Header } from "antd/es/layout/layout";
import React from "react";
import CustomMenu from "../Menu/CustomMenu";
import Styles from './CustomHeader.module.scss'

const CustomHeader = () => (
    <Header className={Styles.container}>
        <CustomMenu />
        {/* <h3>College MarketPlace</h3> */}
    </Header>

)

export default CustomHeader;