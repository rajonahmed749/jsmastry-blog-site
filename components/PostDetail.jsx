import React from 'react';
import moment from 'moment';
import {
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton, TwitterIcon, FacebookIcon, WhatsappIcon
} from "react-share";
import Head from 'next/head';
import { useRouter } from 'next/router';

const PostDetail = ({ post }) => {
    const {router } = useRouter()
    const getContentFragment = (index, text, obj, type) => {
        let modifiedText = text;

        if (obj) {
            if (obj.bold) {
                modifiedText = (<b key={index}>{text}</b>);
            }

            if (obj.italic) {
                modifiedText = (<em key={index}>{text}</em>);
            }

            if (obj.underline) {
                modifiedText = (<u key={index}>{text}</u>);
            }
        }

        switch (type) {
            case 'heading-three':
                return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
            case 'paragraph':
                return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
            case 'heading-four':
                return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
            case 'image':
                return (
                    <img
                        key={index}
                        alt={obj.title}
                        height={obj.height}
                        width={obj.width}
                        src={obj.src}
                    />
                );
            default:
                return modifiedText;
        }
    };

    console.log(post);
    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="csrf_token" content="" />
                <meta property="type" content="website" />
                {/* <meta property="url" content={'https//www.google.com'} /> */}
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="_token" content="" />
                <meta name="robots" content="noodp" />
                <meta property="title" content={post.title} />
                <meta property="quote" content={post.slug} />
                <meta name="description" content={post.excerpt} />
                <meta property="image" content={post.featuredImage.url} />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={post.title} />
                <meta property="og:quote" content={post.slug} />
                <meta property="og:hashtag" content={post.slug} />
                <meta property="og:image" content={post.featuredImage.url} />
                <meta content="image/*" property="og:image:type" />
                {/* <meta property="og:url" content={document.URL} /> */}
                <meta property="og:site_name" content="Compact Blog Site" />
                <meta property="og:description" content={post.excerpt} />

            </Head>
            <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
                <div className="relative overflow-hidden shadow-md mb-6">
                    <img src={post.featuredImage.url} alt="" className="object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg" />
                </div>
                <div className="px-4 lg:px-0">
                    <div className="flex items-center mb-8 w-full">
                        <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 items-center">
                            <img
                                alt={post.author.name}
                                height="30px"
                                width="30px"
                                className="align-middle rounded-full"
                                src={post.author.photo.url}
                            />
                            <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{post.author.name}</p>
                        </div>
                        <div className="font-medium text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="align-middle">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
                        </div>
                    </div>
                    <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
                    {post.content.raw.children.map((typeObj, index) => {
                        const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));

                        return getContentFragment(index, children, typeObj, typeObj.type);
                    })}
                </div>
            </div>
            <div className='mx-auto p-8 text-center bg-white rounded '>
                <FacebookShareButton
                    url={`http://localhost:3000/post/${post.slug}`}
                    quote={post.title}
                    hashtag={post.slug}
                    description={post.excerpt}
                    className="Demo__some-network__share-button"
                >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
            </div>

        </>
    );
};

export default PostDetail;