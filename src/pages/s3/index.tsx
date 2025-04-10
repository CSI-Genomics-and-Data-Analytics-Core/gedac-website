import type { ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import S3CostCalculator from "@site/src/components/S3";
import { ChakraProvider } from "@chakra-ui/react";

export default function Helper(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Storage Calculator | ${siteConfig.title}`}
      description="Interactive calculator to help you estimate storage requirements for your research data"
    >
      <main>
        <ChakraProvider>
          <section className="container margin-top--lg margin-bottom--xl">
            <div className="row">
              <div className="card shadow--md">
                <div className="card__body">
                  <S3CostCalculator />
                </div>
                <div className="card__footer text--center">
                  <small>
                    Adjust your inputs to see how they affect storage
                    requirements.
                  </small>
                </div>
              </div>
            </div>
          </section>
        </ChakraProvider>
      </main>
    </Layout>
  );
}
