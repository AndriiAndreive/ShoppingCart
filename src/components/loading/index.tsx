"use client"
import React from "react";
import Loader from "react-ts-loaders";

import styles from "./loading.module.css";

const Loading = ({ full }: { full?: boolean }) => (
  <div className={`${styles.container} ${full && styles.full}`}>
    <Loader type="spinner" color="green" />
  </div>
);

export default Loading;