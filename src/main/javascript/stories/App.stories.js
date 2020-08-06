import React from 'react';
import App from "../App";

export default {
  title: 'App',
};

export const AppJC = () => <App jql='project=JC'/>;
export const AppSUSHI1 = () => <App jql='project=SUSHI'/>;
export const AppSUSHI2 = () => <App jql='project=SUSHI AND "Epic Link"=SUSHI-1414'/>;
