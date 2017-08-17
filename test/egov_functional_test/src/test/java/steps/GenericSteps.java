package steps;

import com.testvagrant.stepdefs.exceptions.NoSuchEventException;
import cucumber.api.DataTable;
import cucumber.api.PendingException;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import org.openqa.selenium.WebElement;
import pages.GenericPage;
import utils.StringExtract;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.TimeUnit;

import static com.testvagrant.stepdefs.core.Tapster.tapster;

public class GenericSteps extends BaseSteps {
    @Given("^(\\w+)\\s+on\\s+(\\w+)\\s+screen\\s+(\\w+)\\s+on\\s+(\\w+)\\s+value\\s+(.*)$")
    public void consumerOnScreenPerformsActionOnElementWithValue(String consumer, String screen, String action, String element, String value) throws NoSuchEventException, IOException, InterruptedException {

        TimeUnit.SECONDS.sleep(1);
        value = String.valueOf(pageStore.get(GenericPage.class).checkValueCanBeAutoGeneratedOrNot(value));
        WebElement webElement = pageStore.get(GenericPage.class).buildElement(screen, element, value);
        tapster().useDriver(pageStore.getDriver())
                .asConsumer(consumer)
                .onScreen(screen)
                .onElement(element)
                .doAction(action)
                .withValue(value)
                .serveWithElement(webElement);
    }

    @And("^(\\w+)\\s+on\\s+(\\w+)\\s+screen\\s+(\\w+)\\s+on\\s+(\\w+)$")
    public void consumerOnScreenPerformsActionOnElement(String consumer, String screen, String action, String element) throws NoSuchEventException, IOException, InterruptedException {

        TimeUnit.SECONDS.sleep(1);
        WebElement webElement = pageStore.get(GenericPage.class).buildElement(screen, element, "");
        tapster().useDriver(pageStore.getDriver())
                .onScreen(screen)
                .asConsumer(consumer)
                .onElement(element)
                .doAction(action)
                .serveWithElement(webElement);
    }

    @And("^(\\w+)\\s+on\\s+(\\w+)\\sscreen verifies\\s+(\\w+)\\s+is\\s+(.*)$")
    public void assertElement(String consumer, String screen, String element, String action) throws NoSuchEventException, IOException {
        tapster().useDriver(pageStore.getDriver())
                .onScreen(screen)
                .asConsumer(consumer)
                .onElement(element)
                .doAction(action)
                .serve();
    }

    @And("^(\\w+)\\s+on\\s+(\\w+)\\sscreen verifies\\s+(\\w+)\\s+has\\s+(\\w+)\\s+value\\s+(.*)$")
    public void assertElementWithValue(String consumer, String screen, String element, String action, String value) throws NoSuchEventException, IOException {
        if(value.equals("aboveApplicationNumber")){
            value = scenarioContext.getApplicationNumber();
            WebElement webElement = pageStore.get(GenericPage.class).buildElement(screen,element,value);
            tapster().useDriver(pageStore.getDriver())
                    .onScreen(screen)
                    .asConsumer(consumer)
                    .onElement(element)
                    .doAction(action)
                    .withValue(value)
                    .serveWithElement(webElement);
        }
        else{
            tapster().useDriver(pageStore.getDriver())
                    .onScreen(screen)
                    .asConsumer(consumer)
                    .onElement(element)
                    .doAction(action)
                    .withValue(value)
                    .serve();
        }
    }

    @And("^(\\w+) on (\\w+) screen performs following actions$")
    public void userOnScreenPerformsFollowingActions(String consumer, String screen, DataTable dataTable) throws Throwable {
        List<List<String>> data = dataTable.raw();
        int x = 0;

        for (List<String> aData : data) {
            String action = aData.get(x++);
            String element = aData.get(x++);
            String value = aData.get(x);
            value = pageStore.get(GenericPage.class).checkValueCanBeAutoGeneratedOrNot(value);
            WebElement webElement = pageStore.get(GenericPage.class).buildElement(screen, element, value);
            tapster().useDriver(pageStore.getDriver())
                    .asConsumer(consumer)
                    .onScreen(screen)
                    .doAction(action)
                    .onElement(element)
                    .withValue(value)
                    .serveWithElement(webElement);
            x = 0;
        }
    }

    @Given("^(Intent):(.*)$")
    public void intent(String action, String intentId) throws Throwable {
        intent.run(intentId);
    }

    @Given("^(DataIntent):(.*)$")
    public void intentWithDataTable(String action, String intentId, DataTable dataTables) throws Throwable {
        intent.useDatatable(dataTables).run(intentId);
    }

    @And("^(\\w+)\\s+on\\s+(\\w+)\\sscreen\\s+(\\w+)\\sthe\\s+(\\w+)\\s+to\\s+(\\w+)$")
    public void userOnScreenCopiesTextToScenarioContext(String consumer, String screen, String action, String element, String placeHolder) throws Throwable {
        WebElement webElement = pageStore.get(GenericPage.class).buildElement(screen, element, "");
        if (placeHolder.equals("applicationNumber"))
            scenarioContext.setApplicationNumber(pageStore.get(StringExtract.class).getComplaintNumber(webElement));
        else
            scenarioContext.setAssessmentNumber(pageStore.get(StringExtract.class).getComplaintNumber(webElement));
    }

    @And("^(\\w+)\\s+on\\s+(\\w+)\\sscreen\\s+(\\w+)\\son\\s+(\\w+)\\s+with\\s+above\\s+(.*)$")
    public void userOnScreenTypesOnApplicationSearchWithAboveApplicationNumber(String consumer, String screen, String action, String element, String value) throws Throwable {
        if (value.equals("applicationNumber"))
            value = scenarioContext.getApplicationNumber();
        else
            value = scenarioContext.getAssessmentNumber();

        if (action.equals("opens")) {
            tapster().useDriver(pageStore.getDriver())
                    .onScreen(screen)
                    .asConsumer(consumer)
                    .onElement(element)
                    .doAction("types")
                    .withValue(value)
                    .serve();

            TimeUnit.SECONDS.sleep(1);
            pageStore.get(GenericPage.class).openApplication(value).click();
        }
        else {
        WebElement webElement = pageStore.get(GenericPage.class).buildElement(screen, element, value);
            tapster().useDriver(pageStore.getDriver())
                    .onScreen(screen)
                    .asConsumer(consumer)
                    .onElement(element)
                    .doAction(action)
                    .withValue(value)
                    .serveWithElement(webElement);
        }
    }

    @And("^(\\w+)\\s+on (\\w+) screen selects (\\w+) with value as (.*)$")
    public void selectsDropdownWithValue(String consumer, String screen, String element, String value) throws Throwable {
        TimeUnit.SECONDS.sleep(1);
        WebElement webElement = pageStore.get(GenericPage.class).buildElement(screen, element, value);
        pageStore.get(GenericPage.class).clickOnDropdown(webElement, value);
    }

    @And("^(\\w+)\\s+on (\\w+) screen types on (\\w+) suggestion box with value (.*)$")
    public void selectsSuggestionBoxWithValue(String consumer,String screen, String element, String value) throws Throwable {
        WebElement webElement = pageStore.get(GenericPage.class).buildElement(screen, element, "");
        pageStore.get(GenericPage.class).actionOnSuggestionBox(webElement, value);
    }
}