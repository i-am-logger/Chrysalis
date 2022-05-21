// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018-2022  Keyboardio, Inc.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { GlobalContext } from "@renderer/components/GlobalContext";
import { PageTitle } from "@renderer/components/PageTitle";
import i18n from "@renderer/i18n";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { BasicPreferences } from "./Preferences/Basic";
import { DevtoolsPreferences } from "./Preferences/Devtools";
import {
  AdvancedKeyboardSettings,
  KeyboardSettings,
} from "./Preferences/KeyboardSettings";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            px: 3,
            width: "100%",
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function Preferences(props) {
  const [value, setValue] = React.useState(0);
  const globalContext = useContext(GlobalContext);

  const [connected, setConnected] = globalContext.state.connected;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "100%",
        width: "100%",
      }}
    >
      <PageTitle title={i18n.t("app.menu.preferences")} />
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{
          borderRight: 1,
          borderColor: "divider",
          display: "flex",
          alignItems: "left",
          height: "100%",
          minWidth: 300,
        }}
      >
        <Tab label={i18n.t("preferences.interface")} {...a11yProps(0)} />
        <Tab
          label={i18n.t("keyboardSettings.title")}
          {...a11yProps(1)}
          disabled={!connected}
        />
        <Tab
          label={i18n.t("keyboardSettings.advanced")}
          {...a11yProps(2)}
          disabled={!connected}
        />
        <Tab label={i18n.t("preferences.devtools")} {...a11yProps(3)} />
      </Tabs>
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <TabPanel value={value} index={0}>
          <BasicPreferences
            darkMode={props.darkMode}
            toggleDarkMode={props.toggleDarkMode}
          />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <KeyboardSettings inContext={props.inContext} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AdvancedKeyboardSettings inContext={props.inContext} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <DevtoolsPreferences />
        </TabPanel>
      </Box>
    </Box>
  );
}

export default Preferences;
