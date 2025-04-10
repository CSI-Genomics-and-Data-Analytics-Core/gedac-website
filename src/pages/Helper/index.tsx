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
          <div className="row">
            {/* Static Content Section */}
            <div className="col col--4">
              <div className="padding-right--md">
                <h1>Computing Resource Selection Guide</h1>
                <p>
                  This interactive tool helps you navigate through our available computing resources
                  based on your specific data analysis requirements. Follow the decision path by 
                  answering questions about your workflow to find the most suitable computing environment.
                </p>
                <hr className="margin-top--lg margin-bottom--lg" />
                <div className="margin-top--lg">
                  <h3>How to use this guide</h3>
                  <ol>
                    <li>Follow the flowchart path based on your requirements</li>
                    <li>Each decision point helps narrow down the best resource</li>
                    <li>Drag nodes to rearrange the view if needed</li>
                  </ol>
                  <p>
                    <a href="../docs/compute-resources" className="button button--primary button--block margin-top--md">
                      View Detailed Resources Documentation
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* FlowHelper Interactive Section */}
            <div className="col col--8">
              <div className="card shadow--md">
                <div className="card__body">
                  <FlowHelper />
                </div>
                <div className="card__footer text--center">
                  <small>
                    You can drag nodes to rearrange the diagram for better visibility.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}