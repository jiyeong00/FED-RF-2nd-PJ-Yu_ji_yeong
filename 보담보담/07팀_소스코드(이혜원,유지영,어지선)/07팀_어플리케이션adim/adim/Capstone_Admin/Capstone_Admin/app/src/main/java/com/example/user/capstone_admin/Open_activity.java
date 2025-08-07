package com.example.user.capstone_admin;

import android.app.Activity;
import android.app.Dialog;
import android.content.ContentValues;
import android.content.DialogInterface;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.text.method.ScrollingMovementMethod;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.PopupMenu;
import android.widget.TextView;
import android.widget.Toast;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.MalformedURLException;

public class Open_activity extends Activity {
    Button btnOpenAll, btnOpenSel, btnBack;
    View dialogOpAllView, dialogOpSelView;
    TextView tvOpAllLockers, tvOpSelLockers, tvOpSelNum;
    String mJSONString;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.open_activity);
        btnOpenAll = (Button)findViewById(R.id.Bth_opAll);
        btnOpenSel = (Button)findViewById(R.id.Bth_opSel);
        btnBack = (Button)findViewById(R.id.Bth_opBack);

        btnOpenAll.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dialogOpAllView = (View) View.inflate(Open_activity.this, R.layout.open_activity_all_dialog,null);
                AlertDialog.Builder dlgOpAll = new AlertDialog.Builder(Open_activity.this);
                dlgOpAll.setTitle("모든 사물함 열기");
                dlgOpAll.setView(dialogOpAllView);

                tvOpAllLockers = (TextView) dialogOpAllView.findViewById(R.id.TvAllLocker);

                registerForContextMenu(tvOpAllLockers);
                tvOpAllLockers.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        PopupMenu p =new PopupMenu(getApplicationContext(),view);
                        getMenuInflater().inflate(R.menu.open_all,p.getMenu());
                        p.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
                            @Override
                            public boolean onMenuItemClick(MenuItem menuItem) {
                                switch (menuItem.getItemId()){
                                    case R.id.itemLockerArea:
                                        tvOpAllLockers.setText(menuItem.getTitle());
                                        break;
                                    case R.id.itemLockerArea2:
                                        tvOpAllLockers.setText(menuItem.getTitle());
                                        break;
                                    default:
                                        break;
                                }
                                return false;
                            }
                        });
                        p.show();
                    }
                });

                dlgOpAll.setPositiveButton("확인", new DialogInterface.OnClickListener(){
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        String url = "http://172.16.120.18/Adim_Open_All.php";//사용시 변경 바람

                        Open_activity.All_NetworkTask all_networkTask = new Open_activity.All_NetworkTask(url, null);
                        all_networkTask.execute();

                        Toast.makeText(getApplication(),"모든 사물함이 열렸습니다.",Toast.LENGTH_LONG).show();;
                    }
                });
                dlgOpAll.setNegativeButton("취소",null);
                dlgOpAll.show();
            }
        });//모두 여는 다이어로그 작성

        btnOpenSel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dialogOpSelView = (View) View.inflate(Open_activity.this, R.layout.open_activity_sel_dialog,null);
                AlertDialog.Builder dlgOpSel = new AlertDialog.Builder(Open_activity.this);
                dlgOpSel.setTitle("일부 사물함 열기");
                dlgOpSel.setView(dialogOpSelView);

                tvOpSelLockers = (TextView) dialogOpSelView.findViewById(R.id.TvSelLocker);
                tvOpSelNum = (TextView) dialogOpSelView.findViewById(R.id.TvSelNum);

                registerForContextMenu(tvOpSelLockers);
                registerForContextMenu(tvOpSelNum);

                tvOpSelLockers.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        PopupMenu p =new PopupMenu(getApplicationContext(),view);
                        getMenuInflater().inflate(R.menu.open_sell,p.getMenu());
                        p.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
                            @Override
                            public boolean onMenuItemClick(MenuItem menuItem) {
                                switch (menuItem.getItemId()){
                                    case R.id.itemLockerArea:
                                        tvOpSelLockers.setText(menuItem.getTitle());
                                        break;
                                    case R.id.itemLockerArea2:
                                        tvOpSelLockers.setText(menuItem.getTitle());
                                        break;
                                    case R.id.itemLockerArea3:
                                        tvOpSelLockers.setText(menuItem.getTitle());
                                        break;
                                    default:
                                        break;
                                }
                                return false;
                            }
                        });
                        p.show();
                    }
                });

                tvOpSelNum.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        PopupMenu p =new PopupMenu(getApplicationContext(),view);
                        getMenuInflater().inflate(R.menu.open_sel_num,p.getMenu());
                        p.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
                            @Override
                            public boolean onMenuItemClick(MenuItem menuItem) {
                                switch (menuItem.getItemId()){
                                    case R.id.itemLockerNum:
                                        tvOpSelNum.setText(menuItem.getTitle());
                                        break;
                                    default:
                                        break;
                                }
                                return false;
                            }
                        });
                        p.show();
                    }
                });

                dlgOpSel.setPositiveButton("확인", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {

                        final String url = "http://172.16.120.18/Adim_Open_Select.php";//사용시 변경 바람

                        Open_activity.Sel_NetworkTask sel_networkTask = new Open_activity.Sel_NetworkTask(url, null);
                        sel_networkTask.execute();

                        Toast.makeText(getApplication(),"사물함이 열렸습니다.",Toast.LENGTH_LONG).show();;

                    }
                });
                dlgOpSel.setNegativeButton("취소",null);
                dlgOpSel.show();
            }
        });//선택하여 여는 다이어로그 작성

        btnBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });//메인 화면으로 돌아가기

    }

    public class All_NetworkTask extends AsyncTask<Void, Void, String> {

        private String url;
        private ContentValues values;

        public All_NetworkTask(String url, ContentValues values) {

            this.url = url;
            this.values = values;
        }
        @Override
        protected String doInBackground(Void... params) {

            String result; // 요청 결과를 저장할 변수.
            RequestHttpURLConnection requestHttpURLConnection = new RequestHttpURLConnection();
            result = requestHttpURLConnection.request(url, values); // 해당 URL로 부터 결과물을 얻어온다.

            return result;
        }

        @Override
        protected void onPostExecute(String s) {
            super.onPostExecute(s);
            try{
                String state_close ="1";
                String state_result="";
                JSONObject order=new JSONObject(s);
                JSONArray index=order.getJSONArray("webnautes");
                for (int i=0;i<index.length();i++) {
                    JSONObject tt = index.getJSONObject(i);
                    if (tt.getString("lckLock").equals(state_close)) {

                        mJSONString = "열렸습니다.";

                    } else
                        state_result += "문이 열려있거나, 오류가 발생했습니다.";
                }

            }catch (JSONException e){
                ;
            }
        }
    } // 모든 문 열기

    public class Sel_NetworkTask extends AsyncTask<Void, Void, String> {

        private String url;
        private ContentValues values;

        public Sel_NetworkTask(String url, ContentValues values) {

            this.url = url;
            this.values = values;
        }
        @Override
        protected String doInBackground(Void... params) {

            String result; // 요청 결과를 저장할 변수.
            RequestHttpURLConnection requestHttpURLConnection = new RequestHttpURLConnection();
            result = requestHttpURLConnection.request(url, values); // 해당 URL로 부터 결과물을 얻어온다.

            return result;
        }

        @Override
        protected void onPostExecute(String s) {
            super.onPostExecute(s);
            try{
                String state_close ="1";
                String state_result="";
                JSONObject order=new JSONObject(s);
                JSONArray index=order.getJSONArray("webnautes");
                for (int i=0;i<index.length();i++) {
                    JSONObject tt = index.getJSONObject(i);
                    if (tt.getString("lckLock").equals(state_close)) {

                        mJSONString = "열렸습니다.";

                    } else
                        state_result += "문이 열려있거나, 오류가 발생했습니다.";
                }

            }catch (JSONException e){
                ;
            }
        }
    } //문을 선택하여 열기(정해져 있다.)
}

