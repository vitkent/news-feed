import React, { useEffect, useRef } from 'react';
import { Spin, Row, Col } from 'antd';
import { NewsCard } from './card/news-card';
import { useAppDispatch, useAppSelector } from '../../../shared/store/store';
import { fetchNews } from '../../../shared/store/newsSlice';

export const News: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, hasMore } = useAppSelector((state) => state.news);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(loading);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchNews(0));
    }
  }, [dispatch, items.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current && hasMore) {
          dispatch(fetchNews(items.length));
        }
      },
      { threshold: 1.0 }
    );

    const currentObserverRef = observerRef.current;

    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [dispatch, items.length, hasMore]);

  return (
    <>
      <Row gutter={[24, { xs: 16, sm: 24 }]}>
        {items.map((item) => (
          <Col
            key={item.id}
            xs={24}
            sm={12}
          >
            <NewsCard
              key={item.id}
              {...item}
            />
          </Col>
      ))}
      </Row>
      {hasMore && (
        <div ref={observerRef} style={{ textAlign: 'center', padding: '20px', marginTop: '20px' }}>
          <Spin size="large" />
        </div>
      )}
    </>
  );
};
