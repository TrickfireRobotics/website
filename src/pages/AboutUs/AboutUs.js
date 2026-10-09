import "./AboutUs.scss";
import { TextImage } from "./../../components/TextImage/TextImage";
import { MaxWidthContainer } from "./../../components/MaxWidthContainer/MaxWidthContainer";
import { ImageCarousel } from "./../../components/ImageCarousel/ImageCarousel";
import { OutlinedBox } from "../../components/OutlinedBox/OutlinedBox";
import Rover2025 from "../../assets/AboutUs/rover2025.jpeg";
import RoverUnveiling2025 from "../../assets/AboutUs/roverUnveiling2025.jpeg";
import { OfficerSection } from "../../components/OfficerSection/OfficerSection";
import TeamPhoto2020 from "../../assets/AboutUs/teamPhoto2020.jpg";
import TeamPhoto2024 from "../../assets/AboutUs/teamPhoto2024.jpg";
import TeamPhoto2025 from "../../assets/AboutUs/teamPhoto2025.jpeg";
import { client } from "../../assets/SanityClient";
import { GradientLine } from "../../components/GradientLine/GradientLine";
import { PageSEO } from "../../components/PageSEO/PageSEO";
import { useRef, useEffect, useState } from "react";

const image_carousel_images = [
  {
    src: TeamPhoto2025,
    altText:
      "Three rows of students standing outside in front of a large W. Lush green plants to either side, the sky is blue with clouds.",
  },
  {
    src: TeamPhoto2024,
    altText:
      "Two rows of students standing outside in front of a large W. Lush green plants to either side, the sky is blue.",
  },
  {
    src: TeamPhoto2020,
    altText:
      "Students stand and sit in front of a large W. Some are in TrickFire Robotics shirts. The ground is cold and wet, the sky is gray.",
  },
];

export const AboutUs = () => {
  const [officers, setOfficers] = useState([]);
  const current_year = new Date().getFullYear();
  const founding_year = 2016;
  const years = [];

  for (let year = founding_year; year <= current_year; year++) {
    years.push(year);
  }

  const yearSectionRef = useRef(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "officers"] | order(coalesce(displayOrder, 999999) asc, name asc)`)
      .then((data) => setOfficers(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (yearSectionRef.current) {
      const yearSection = document.querySelector(".year-section");

      let scrollDirection = 1;
      let scrollSpeed = 1;

      function horizontalScrollBounce() {
        if (scrollDirection === 1) {
          yearSection.scrollLeft += scrollSpeed;
          if (
            yearSection.scrollLeft >=
            yearSection.scrollWidth - yearSection.clientWidth
          ) {
            scrollDirection = -1;
          }
        } else {
          yearSection.scrollLeft -= scrollSpeed;
          if (yearSection.scrollLeft <= 0) {
            scrollDirection = 1;
          }
        }
      }

      setInterval(horizontalScrollBounce, 45);
    }
  });

  return (
    <>
      <PageSEO
        title="About Us"
        description="Learn about TrickFire Robotics, our mission, team members, and officers. Founded in 2016, we're committed to developing future engineers and innovators."
        keywords="about, team, officers, mission, TrickFire"
        url="/about-us"
      />
      <main className="about-us">
        <ImageCarousel
          title="Our Story"
          images={image_carousel_images}
          numImages={Object.keys(image_carousel_images).length}
          overlay="TrickFire Robotics is a student team at UWB currently competing in the University Rover Challenge by the Mars Society. We previously competed in NASA Lunabotics, a lunar mining competition. Over the years, TrickFire has built a strong student and alumni community."
        />

        <div className="horizontal-scroll-year-section">
          <MaxWidthContainer>
            <div className="year-section">
              {years.map((item, index) => (
                <div className="year" key={index} ref={yearSectionRef}>
                  <h1>{item}</h1>
                  <div className="gradient-underline">
                    <GradientLine />
                    <GradientLine />
                  </div>
                </div>
              ))}
            </div>
          </MaxWidthContainer>
        </div>

        <MaxWidthContainer>
          <TextImage
            imageOrder="image-left"
            subheader="About Us"
            text={[
              "TrickFire Robotics is a large-scale aerospace robotics team at the University of Washington Bothell that competes in the  ",
              <a
                href="https://urc.marssociety.org"
                rel="noreferrer"
                target="_blank"
              >
                University Rover Challenge
              </a>,
              ". The URC is an international competition challenging students to design and build rovers relevant to future Mars exploration. Teams compete in four missions related to autonomous navigation, life detection, equipment servicing, and extreme delivery. Since 2016, TrickFire Robotics has attracted a diverse, interdisciplinary group of students and provided opportunities for professional and technical development.",
            ]}
            showButton={false}
            imageSource={RoverUnveiling2025}
            alternativeText="A large student team standing behind a rover with multicolored wheels."
          />

          <TextImage
            imageOrder="image-right"
            subheader="Our Disciplines"
            text={[
              "TrickFire Robotics is composed of students from a variety of majors with business and technical interests.   ",
              <div>
                <br></br>
                <ul>
                  <li>Software Engineering</li>
                  <li>Mechanical Engineering</li>
                  <li>Electrical Engineering</li>
                  <li>Science</li>
                  <li>Marketing</li>
                  <li>Finance</li>
                </ul>
              </div>,
            ]}
            showButton={false}
            imageSource={Rover2025}
            alternativeText="A rover with multicolored wheels on a sidewalk in front of plants and a brick wall. "
          />
        </MaxWidthContainer>

        <OutlinedBox
          backgroundText="Join"
          link="https://forms.office.com/Pages/ResponsePage.aspx?id=W9229i_wGkSZoBYqxQYL0i7wGfH_Ef9MlM3y37_kRLpUMEVVSDJTTFFOU0RNOEhNVVYyWUI2TjdOTyQlQCN0PWcu"
          buttonText="Join Us!"
          buttonType="external"
          text="Our team consists of smaller specialized subteams that all contribute to the rover at large. Members can join multiple teams and work on several different projects covering a variety of disciplines. No previous experience is needed to join! New members are onboarded on a rolling basis."
        />
        <MaxWidthContainer>
          <OfficerSection allOfficers={officers} />
        </MaxWidthContainer>
      </main>
    </>
  );
};
