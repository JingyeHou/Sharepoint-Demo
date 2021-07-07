import React, { useRef, useEffect, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
import axios from 'axios';
import qs from 'qs';
import './App.css';

const getDownloadFileName = (name, extension = '.pdf') => {
  if (name.slice(-extension.length).toLowerCase() !== extension) {
    name += extension;
  }
  return name;
};

const body = {
  grant_type: process.env.REACT_APP_GRANT_TYPE,
  client_id: process.env.REACT_APP_CLIENT_ID,
  client_secret: process.env.REACT_APP_CLIENT_SECRET,
  resource: process.env.REACT_APP_RESOURCE
};

const analyzeUrl = url => {
  const fileNameStartIndex = url.indexOf('=') + 1;
  const fileNameEndIndex = url.indexOf('&');
  const filename = url.slice(fileNameStartIndex, fileNameEndIndex);
  const folderNameStartIndex = url.indexOf('=', fileNameEndIndex) + 1;
  const folderNameEndIndex = url.indexOf('&', folderNameStartIndex);
  const foldername = url.slice(folderNameStartIndex, folderNameEndIndex);
  const userNameStartIndex = url.indexOf('=', folderNameEndIndex) + 1;
  const username = url.slice(userNameStartIndex).replace('%20', ' ');
  return { filename, foldername, username };
};

const App = () => {
  const viewer = useRef(null);
  const [token, setToken] = useState('');
  useEffect(() => {
    if (!token) {
      axios({
        method: 'post',
        url: `/${process.env.REACT_APP_TENANT_ID}/tokens/OAuth/2`,
        headers: {
          Accept: 'application/json;odate=verbose',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        data: qs.stringify(body)
      }).then(({ data }) => {
        setToken(data.access_token);
      });
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    WebViewer(
      {
        path: '/webviewer/lib'
      },
      viewer.current
    ).then(instance => {
      const { docViewer, annotManager } = instance;

      var modal = {
        dataElement: 'meanwhileInFinlandModal',
        render: function renderCustomModal() {
          const doc = docViewer.getDocument();
          var div = document.createElement('div');
          const para = document.createElement('p');
          const node = document.createTextNode(
            'Enter your custom file name, please!'
          );
          para.appendChild(node);
          div.appendChild(para);
          var input = document.createElement('INPUT');
          input.value = doc.getFilename();
          input.setAttribute('type', 'text');
          input.setAttribute('id', 'myInput');
          var button = document.createElement('BUTTON');
          div.appendChild(input);
          button.setAttribute('content', 'confirm');
          button.textContent = 'Save';
          button.onclick = async () => {
            const doc = docViewer.getDocument();
            const downloadFileName = getDownloadFileName(input.value);
            console.log(downloadFileName);
            const xfdfString = await annotManager.exportAnnotations();
            const data = await doc.getFileData({
              // saves the document with annotations in it
              xfdfString,
              downloadType: 'pdf'
            });
            const arr = new Uint8Array(data);
            const file = new File([arr], downloadFileName, {
              type: 'application/pdf'
            });
            axios
              .post(
                `${process.env.REACT_APP_ABSOLUTE_URL}/_api/web/GetFolderByServerRelativeUrl('${foldername}')/Files/add(url='${downloadFileName}',overwrite=true)`,
                file,
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }
              )
              .then(({ data }) => {
                console.log(data);
              })
              .catch(err => console.log(err));
            instance.closeElements([modal.dataElement]);
          };
          div.appendChild(button);
          div.style.color = 'black';
          div.style.backgroundColor = 'white';
          div.style.fontSize = '16px';
          div.style.padding = '20px 40px';
          div.style.borderRadius = '5px';
          return div;
        }
      };
      instance.setCustomModal(modal);

      const {
        filename = 'Document.docx',
        foldername = 'Shared Documents',
        username = 'Guest'
      } = analyzeUrl(window.location.search);
      annotManager.setCurrentUser(username);
      annotManager.setIsAdminUser(true);
      axios
        .get(
          `${process.env.REACT_APP_ABSOLUTE_URL}/_api/web/GetFolderByServerRelativeUrl('${foldername}')/Files('${filename}')/$value`,
          {
            headers: { Authorization: `Bearer ${token}` },
            responseType: 'blob'
          }
        )
        .then(({ data }) => {
          instance.loadDocument(data, { filename });
        });
      docViewer.on('documentLoaded', () => {
        instance.setHeaderItems(header => {
          header.push({
            type: 'actionButton',
            img:
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
            onClick: async () => {
              instance.openElements([modal.dataElement]);
            }
          });
        });
      });
    });
  }, [token]);

  return (
    <div className="App">
      <div className="header">React sample</div>
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default App;
