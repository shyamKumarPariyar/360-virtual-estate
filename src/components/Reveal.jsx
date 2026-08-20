import { useEffect, useRef, useState } from "react";

const Reveal = ({as: Tag = "div", delay = 0, className = "", children, ...rest }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;

        if (!el) return;

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    io.unobserve(el);
                }
            },
            {
                threshold: 0.15,
            }
        );

        io.observe(el);

        return () => io.disconnect();
    }, []);

    return (
        <Tag
        ref={ref}
        className={`reveal ${visible ? "reveal--visible" : ""} ${className}`}
        style={{ transitionDelay: `${delay}ms` }}
        {...rest}
        >
        {children}
        </Tag>
    );
};

export default Reveal;