import React, { useState,Component } from 'react';
import marked from 'marked'
import hljs from "highlight.js";
import { Row, Col, Input } from 'antd'
import 'antd/dist/antd.css';
import 'highlight.js/styles/monokai-sublime.css';

// const { TextArea } = Input

// class Markdown extends Component {



//     render() {
//         return (
//             <div>
                
//             </div>
//         );
//     }
// }

// export default Markdown;
const { TextArea } = Input;
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

function AddArticle() {

  const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容

  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
    gfm: true, // 允许 Git Hub标准的markdown.
    pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
    sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
    tables: true, // 允许支持表格语法（该选项要求 gfm 为true）
    breaks: false, // 允许回车换行（该选项要求 gfm 为true）
    smartLists: true, // 使用比原生markdown更时髦的列表
    smartypants: false, // 使用更为时髦的标点
  })

  const changeContent = (e) => {
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }

  return (
    <div>
      <Row>
        <Col span={24}>
          <br />
          <Row >

            <Col span={12}>
              <TextArea 
                className="markdown-content"
                rows={35}
                onChange={changeContent}
                onPressEnter={changeContent}
                placeholder="编辑内容"
              />
            </Col>

            <Col span={12}>
              <div className="show-html" dangerouslySetInnerHTML={{ __html: markdownContent }}></div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default AddArticle