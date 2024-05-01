import { Badge, Sheet, Tooltip } from "@/components/ui";
import { useEnqSidebar } from "@/hooks";
import { EnquiryStatus, IEnquiry } from "@/types";
import { EnquiryStatusTag } from "../domain";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const eq: IEnquiry = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  dob: "1990-05-15",
  gender: "Male",
  country: "United States",
  nationality: "American",
  address: "123 Main St",
  city: "New York",
  state: "NY",
  zip: "10001",
  migrateToCountry: "Canada",
  visaType: "Work Permit",
  message: "Seeking better job opportunities",
  status: EnquiryStatus.PENDING,
  source: "Referral",
  citizenship: "American",
  currentVisaType: "Tourist Visa",
  currentVisaExpiry: "2024-06-30",
  education: [
    {
      degree: "Bachelor's",
      major: "Computer Science",
      institution: "University of XYZ",
      year: "2012",
    },
    {
      degree: "Master's",
      major: "Computer Science",
      institution: "University of XYZ",
      year: "2015",
    },
  ],
  workExperience: [
    {
      jobTitle: "Software Engineer",
      company: "ABC Inc.",
      start: "2013-01-01",
      end: "2023-12-31",
      isCurrent: false,
    },
    {
      jobTitle: "Senior Software Engineer",
      company: "XYZ Corp.",
      start: "2024-01-01",
      isCurrent: true,
    },
  ],
  englishProficiency: [
    {
      test: "IELTS",
      score: "7.5",
      date: "2023-05-20",
      scoreDivision: {
        listening: "7.5",
        reading: "7.5",
        writing: "7.0",
        speaking: "8.0",
      },
      isResultAvailable: true,
    },
  ],
  createdAt: "2024-04-27T12:00:00Z",
  updatedAt: "2024-04-27T12:00:00Z",
};
export function EnquirySidebar() {
  const { openId, open, close } = useEnqSidebar();
  const idIsOpen = Boolean(openId);

  const toggle = (state: boolean) => {
    if (state) {
      open(openId!);
    } else {
      close();
    }
  };

  if (!idIsOpen) return null;
  return (
    <Sheet.Root open={idIsOpen} onOpenChange={toggle}>
      <Sheet.Content className="w-[36rem] flex flex-col">
        <Sheet.Header>
          <Sheet.Title className="space-y-0.5">
            <p className="text-foreground">
              {eq.firstName} {eq.lastName} &middot; {eq.country}
            </p>
            <p className="text-xs text-gray-400">
              {eq.address}, {eq.city}, {eq.state}, {eq.zip}
            </p>
          </Sheet.Title>
        </Sheet.Header>

        <div className="flex-1 overflow-auto mt-2">
          <SectionWithTags
            title="Personal Information"
            tags={[
              { title: "Email", value: eq.email, cols: 2 },
              { title: "Date Of Birth", value: eq.dob },
              { title: "Gender", value: eq.gender },
              {
                title: "Enquiry Status",
                value: <EnquiryStatusTag status={eq.status} />,
              },
              { title: "Enquiry Source", value: eq.source },
            ]}
          />

          <hr className="my-6" />
          <SectionWithTags
            title="Current Immigration Status"
            tags={[
              { title: "Citizenship", value: eq.citizenship },
              { title: "Visa type", value: eq.currentVisaType },
              { title: "Expiry Date", value: eq.currentVisaExpiry },
            ]}
          />

          <hr className="my-6" />
          <SectionWithTags
            title="Immigration Intentions"
            tags={[
              { title: "Migrate to", value: eq.migrateToCountry },
              { title: "Visa type", value: eq.visaType },
            ]}
          />

          <hr className="my-6" />
          <SectionWithTags title="Message">
            <p className="text-xs">{eq.message}</p>
          </SectionWithTags>

          <hr className="my-6" />
          <SectionWithTags title="Education">
            <div className="col-span-2 space-y-4">
              {eq.education.map((edu, i) => (
                <div key={i} className="grid grid-cols-2 gap-1">
                  <TagWithLabel title="Degree" value={edu.degree} />
                  <TagWithLabel title="Major" value={edu.major} />
                  <TagWithLabel title="Institution" value={edu.institution} />
                  <TagWithLabel title="Year" value={edu.year} />
                </div>
              ))}
            </div>
          </SectionWithTags>

          <hr className="my-6" />
          <SectionWithTags title="Work Experience">
            <div className="col-span-2 space-y-4">
              {eq.workExperience.map((exp, i) => (
                <div key={i} className="grid grid-cols-2 gap-1">
                  <TagWithLabel
                    title="Job Title"
                    value={`${exp.jobTitle} at ${exp.company}`}
                    cols={2}
                  />
                  <TagWithLabel title="Start Date" value={exp.start} />
                  <TagWithLabel
                    title="End Date"
                    value={exp.isCurrent ? "Present" : exp.end!}
                  />
                </div>
              ))}
            </div>
          </SectionWithTags>

          <hr className="my-6" />
          <SectionWithTags title="English Proficiency">
            <div className="col-span-2 space-y-4">
              {eq.englishProficiency.map((prof, i) => (
                <div key={i} className="grid grid-cols-2 gap-1">
                  <TagWithLabel title="Test" value={prof.test} />
                  <TagWithLabel title="Date" value={prof.date} />
                  <TagWithLabel
                    title="Score"
                    value={
                      prof.isResultAvailable
                        ? `${prof.score} Overall`
                        : "Result awaited"
                    }
                  />
                  {prof.scoreDivision && (
                    <>
                      <TagWithLabel
                        title="Listening"
                        value={prof.scoreDivision.listening.toString()}
                      />
                      <TagWithLabel
                        title="Reading"
                        value={prof.scoreDivision.reading.toString()}
                      />
                      <TagWithLabel
                        title="Writing"
                        value={prof.scoreDivision.writing.toString()}
                      />
                      <TagWithLabel
                        title="Speaking"
                        value={prof.scoreDivision.speaking.toString()}
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          </SectionWithTags>
        </div>
      </Sheet.Content>
    </Sheet.Root>
  );
}

function TagWithLabel({
  title,
  value,
  cols = 1,
}: {
  title: string;
  value: string | JSX.Element;
  cols?: number;
}) {
  return (
    <div
      className={`grid grid-cols-[5rem,1fr] gap-3 items-center col-span-${cols}`}
    >
      <p className="text-xs text-nowrap truncate">{title}</p>
      <div>
        {typeof value === "string" ? (
          <Badge variant={"secondary"} className="text-nowrap truncate">
            {value}
          </Badge>
        ) : (
          value
        )}
      </div>
    </div>
  );
}

type TagWithLabelProps = Parameters<typeof TagWithLabel>[0][];
type SectionWithTagsProps = {
  tags?: TagWithLabelProps;
  title: string;
};
function SectionWithTags(props: React.PropsWithChildren<SectionWithTagsProps>) {
  const { tags, title, children } = props;

  return (
    <div className="gap-x-4 gap-y-2 grid grid-cols-2">
      <p className="text-sm font-bold col-span-2 border-l-2 pl-2 border-primary text-foreground">
        {title}
      </p>
      {tags?.map((tag, i) => (
        <TagWithLabel key={i} {...tag} />
      ))}

      {children}
    </div>
  );
}
