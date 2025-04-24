import type { ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import FlowHelper from "@site/src/components/Helper";

export default function Helper(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Resource Selection Guide | ${siteConfig.title}`}
      description="Interactive guide to help you select the right computational resources for your data analysis needs"
    >
      <main>
        <section className="container margin-top--lg margin-bottom--xl">
            {/* FlowHelper Interactive Section */}
            <div className="card shadow--md">
              <div className="card__body">
                <FlowHelper />
              </div>
              <div className="card__footer text--center">
                <small>
                  You can drag nodes to rearrange the diagram for better
                  visibility.
                </small>
              </div>
            </div>
        </section>
      </main>
    </Layout>
  );
}
