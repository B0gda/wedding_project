import { Heart } from 'lucide-react';
import coupleImage from '@constants/1Block-Photoroom.png';
import { calendarWeekdays, octoberCalendar } from '@constants/calendar';
import { invitationCopy } from '@constants/copy';
import flowerLeft from '@constants/for first left.png';
import flowerRight from '@constants/for first right.png';
import { CountUp } from '@shared/react-bits/CountUp/CountUp';
import { SplitText } from '@shared/react-bits/SplitText/SplitText';
import './HeroSection.css';

type HeroSectionProps = {
  title: string;
  daysLeft: number;
};

export function HeroSection({ title, daysLeft }: HeroSectionProps) {
  const { hero } = invitationCopy;
  const { invitation } = invitationCopy.sections;

  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="hero__shell">
        <div className="hero__content">
          <div className="hero__copy">
            <SplitText
              id="hero-title"
              text={title}
              tag="h1"
              className="hero__title"
              delay={36}
              duration={1.05}
              splitType="chars"
            />
          </div>
          <div className="hero__photo-stage" aria-label="Фото Богдана и Вероники">
            <div className="hero__portrait-frame">
              <img className="hero__flower hero__flower--left" src={flowerLeft} alt="" />
              <img className="hero__flower hero__flower--right" src={flowerRight} alt="" />
              <div className="hero__photo-viewport">
                <img className="hero__photo" src={coupleImage} alt="Богдан и Вероника" />
              </div>
            </div>
          </div>
          <div className="hero__invitation">
            <p className="hero__guest-name">{hero.guestName}</p>
            <p>{hero.firstText}</p>
            <p>{hero.secondText}</p>
          </div>
          <div className="invitation-calendar hero__calendar" aria-label={invitation.calendarLabel}>
            <div className="invitation-calendar__header">
              <span>{invitation.month}</span>
              <strong>{invitation.year}</strong>
            </div>
            <div className="invitation-calendar__weekdays" aria-hidden="true">
              {calendarWeekdays.map((weekday, index) => (
                <span key={`${weekday}-${String(index)}`}>{weekday}</span>
              ))}
            </div>
            <div className="invitation-calendar__grid">
              {octoberCalendar.map((date, index) => (
                <span
                  className={
                    date.selected
                      ? 'invitation-calendar__day invitation-calendar__day--selected'
                      : date.muted
                        ? 'invitation-calendar__day invitation-calendar__day--muted'
                        : 'invitation-calendar__day'
                  }
                  aria-label={date.selected ? invitation.selectedDateLabel : String(date.day)}
                  key={`${String(date.day)}-${String(index)}`}
                >
                  {date.selected ? <Heart aria-hidden="true" /> : null}
                  <span>{date.day}</span>
                </span>
              ))}
            </div>
            <div className="invitation-calendar__countdown">
              <span>{invitation.countdownLabel}</span>
              <strong>
                <CountUp
                  className="invitation-calendar__count"
                  from={0}
                  to={daysLeft}
                  duration={3.2}
                />
              </strong>
              <span>{invitation.countdownUnit}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
