import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { ENV } from '../../config/config';
import { beforeFaq, getFaqs, upsertFAQ ,deleteFAQ} from './Faq.action';
import FullPageLoader from 'components/FullPageLoader/FullPageLoader';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import localeInfo from 'rc-pagination/lib/locale/en_US';
import moment from 'moment';
import Swal from 'sweetalert2';
import { Button, Card, Table, Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

const Faqs = (props) => {
    const [faqs, setFaqs] = useState(null)
    const [pagination, setPagination] = useState(null)
    const [loader, setLoader] = useState(true)
    const [showClearBtn, setShowClearBtn] = useState(false)
    const [qSearch, setQSearch] = useState("") 

    const faqSearchInput = useRef()

    useEffect(() => {
        window.scroll(0, 0)
        props.getFaqs();
         setLoader(false);
    }, [])

    useEffect(() => {
        if (props.faqs.getFaqAuth) {
            const { faqs, pagination } = props.faqs;
            setFaqs(faqs)
            setPagination(pagination)
            props.beforeFaq()
        }
    }, [props.faqs.getFaqAuth])

    useEffect(() => {
        if (faqs) {
            setLoader(false)
        }
    }, [faqs])

    // when faq is deleted
    useEffect(() => {
        if (props.faqs.deleteFaqAuth) {
            const faqRes = props.faqs.faq
            if (faqRes.success && pagination)
                onPageChange(pagination.page)
            props.beforeFaq()
        }
    }, [props.faqs.deleteFaqAuth])

    // when an error is received
    useEffect(() => {
        if (props.error.error)
            setLoader(false)
    }, [props.error.error])

    const deleteFaq = (Id) => {
        Swal.fire({
            title: 'Are you sure you want to delete?',
            html: 'If you delete an item, it would be permanently lost.',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then(async (result) => {
            if (result.value) {
                setLoader(true)
                props.deleteFAQ(Id);
            }
        })
    }

    const onPageChange = async (page) => {
        setLoader(true)
        const qs = ENV.objectToQueryString({ page })
        props.getFaqs(qs)
    }

    // apply search on faq listing
    const applySearchFaq = async (e) => {
        e.preventDefault ()
        if(faqSearchInput.current.value && faqSearchInput.current.value !== qSearch){
            let question = ""
            question = faqSearchInput?.current?.value
            let body = { question : question}
            setLoader(true)
            props.getFaqs('', body)
            setShowClearBtn(true)
            setQSearch(question)
        }
    }

    const clearSearch = () => {
        faqSearchInput.current.value = ""
        setLoader(true)
        props.getFaqs()
        setQSearch("")
        setShowClearBtn(false)
    }

    return (
        <>
            {
                loader &&
                    <FullPageLoader />
            }
            <Container>
                <Row>
                    <Col md="12">
                        <Card className="table-big-boy">
                            <Card.Header>
                                <Card.Title as="h4">Faqs</Card.Title>
                                <p className="card-category">List of faqs</p>
                                <div>
                                    <form onSubmit={(e)=> {applySearchFaq(e)}}>
                                        <div className = "search-filter">
                                            <input className="form-control" ref={faqSearchInput} placeholder="Enter Question ..."/>
                                            <div className="my-bt"  style={{marginLeft: "20px"}}>
                                            <button className="btn btn-info" type="submit">Apply Search</button>
                                            </div>
                                            {
                                            showClearBtn && <button className="btn btn-secondary" onClick={() => clearSearch()} >Clear</button>
                                            }
                                        </div>
                                    </form>
                                </div>
                                <div className="my-bt">
                                <Button
                                    variant="info"
                                    className="float-sm-right"
                                    onClick={() => props.history.push(`/faq`)}>
                                    Add Faq
                                </Button>
                                </div>
                                <br></br>
                            </Card.Header>
                            <Card.Body className="table-full-width">
                                <Table className="table-bigboy">
                                    <thead>
                                        <tr>
                                            <th className="text-center">#</th>
                                            <th>Question</th>
                                            <th>Answer</th>
                                            <th className="text-right">Created At</th>
                                            <th className="text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            faqs && faqs.length ?
                                                faqs.map((faq, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td className="text-center">{pagination && ((pagination.limit * pagination.page) - pagination.limit) + index + 1}</td>
                                                                <td className="td-name">
                                                                <p className="description">{faq.question}</p>
                                                            </td>
                                                            <td className="td-name description" dangerouslySetInnerHTML={{__html: faq?.answer}}>
                                                            </td>
                                                            <td className="td-number">{moment(faq.createdAt).format('DD MMM YYYY')}</td>
                                                            <td className="td-actions">
                                                                <OverlayTrigger
                                                                    overlay={
                                                                        <Tooltip id="tooltip-436082023">
                                                                            Edit
                                                                        </Tooltip>
                                                                    }
                                                                    placement="left"
                                                                >
                                                                    <Button
                                                                        className="btn-link btn-icon"
                                                                        type="button"
                                                                        variant="success"
                                                                        onClick={()=>props.history.push(`/faq/${faq._id}`)}
                                                                    >
                                                                        <i className="fas fa-edit"></i>
                                                                    </Button>
                                                                </OverlayTrigger>
                                                                <OverlayTrigger
                                                                    overlay={
                                                                        <Tooltip id="tooltip-334669391">
                                                                            Delete
                                                                        </Tooltip>
                                                                    }
                                                                    placement="left"
                                                                >
                                                                    <Button
                                                                        className="btn-link btn-icon"
                                                                        type="button"
                                                                        variant="danger"
                                                                        onClick={() => deleteFaq(faq._id)}
                                                                    >
                                                                        <i className="fas fa-times"></i>
                                                                    </Button>
                                                                </OverlayTrigger>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                :
                                                <tr><td colSpan="7" className="text-center">No faqs found</td></tr>
                                        }
                                    </tbody>
                                </Table>
                                {
                                    pagination &&
                                    <Pagination
                                        className="m-3"
                                        defaultCurrent={1}
                                        pageSize // items per page
                                        current={pagination.page} // current active page
                                        total={pagination.pages} // total pages
                                        onChange={onPageChange}
                                        locale={localeInfo}
                                    />
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

const mapStateToProps = state => ({
    faqs:state.faqs,
    error: state.error
});

export default connect(mapStateToProps, { beforeFaq, getFaqs, upsertFAQ, deleteFAQ })(Faqs);