import { css } from '@emotion/css'

export const styles = {
  container: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  `,
  inner: css`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    padding: 0px 20px;
    height: 80vh;
    overflow: scroll;
  `,
  topbar: css`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
    padding: 0px 20px;
    align-items: center;
  `,
  selectDropdown: css`
    width: 100px;
    height: 30px;
  `,
  bottomBar: css`
    background-color: rgb(35 54 69);
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 10vh;
    max-height: 100px;
  `,
  button: css`
    margin: 0px 20px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  `
}